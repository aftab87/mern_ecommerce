import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios';

const initialState = {
    loading: true,
    cartItems: localStorage.getItem('cartItems')
        ? JSON.parse(localStorage.getItem('cartItems'))
        : [],
    shippingAddress: localStorage.getItem('shippingAddress')
        ? JSON.parse(localStorage.getItem('shippingAddress'))
        : {},
    paymentMethod: localStorage.getItem('paymentMethod')
        ? JSON.parse(localStorage.getItem('paymentMethod'))
        : {},
    order: {}
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        add: (state, { payload }) => {
            const curItem = payload
            const existingItem = state.cartItems.find(item => item.product === curItem.product)

            if (existingItem) {
                state.cartItems = state.cartItems.map(item => item.product === existingItem.product ? curItem : item)
            } else {
                state.cartItems = [...state.cartItems, curItem]
            }
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems))
        },
        remove: (state, { payload }) => {
            state.cartItems = state.cartItems.filter(curItem => curItem.product !== payload)
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems))
        },
        reset: (state) => {
            state.cartItems = []
            localStorage.removeItem('cartItems')
        },
        cart_saveShippingAddress: (state, { payload }) => {
            state.shippingAddress = payload
            localStorage.setItem('shippingAddress', JSON.stringify(payload))
        },
        cart_savePaymentMethod: (state, { payload }) => {
            state.paymentMethod = payload
            localStorage.setItem('paymentMethod', JSON.stringify(payload))
        },
        createOrderRequest: state => {
            state.error = null;
            state.success = false;
            state.loading = true;
        },
        createOrderSuccess: (state, { payload }) => {
            state.error = null;
            state.loading = false;
            state.order = payload;
            state.success = true;
        },
        createOrderFail: (state, { payload }) => {
            state.error = payload;
            state.loading = false;
            state.success = false;
        },
        getOrderRequest: state => {
            state.error = null;
            state.order = {};
            state.loading = true;
        },
        getOrderSuccess: (state, { payload }) => {
            state.error = null;
            state.loading = false;
            state.order = payload;
        },
        getOrderFail: (state, { payload }) => {
            state.error = payload;
            state.loading = false;
        },
    }
})

export const addToCart = (id, qty) => {
    return async dispatch => {
        const { data: { _id, name, image, price, countInStock } } = await axios.get(`/api/products/${id}`)
        qty = (countInStock === 0) ? 0
            : (qty < 0) ? 1
                : (qty > countInStock) ? countInStock : qty

        dispatch(
            add({
                product: _id,
                name,
                image,
                price,
                countInStock,
                qty
            })
        )

    }
}

export const removeFromCart = (id) => {
    return async (dispatch, getState) => {
        dispatch(remove(id))
    }
}

export const resetCart = () => {
    return async (dispatch, getState) => {
        dispatch(reset())
    }
}

export const saveShippingAddress = (data) => {
    return async dispatch => {
        dispatch(cart_saveShippingAddress(data))
    }
}

export const savePaymentMethod = (data) => {
    return async dispatch => {
        dispatch(cart_savePaymentMethod(data))
    }
}

export const createOrder = (order) => {
    return async (dispatch, getState) => {
        try {
            dispatch(createOrderRequest())

            const { user: { user } } = getState()
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${user.token}`
                }
            }

            const { data } = await axios.post(`/api/orders`, order, config)

            dispatch(createOrderSuccess(data))
        } catch (e) {
            dispatch(createOrderFail(e.response && e.response.data.message
                ? e.response.data.message
                : e.message
            ))
        }
    }
}

export const getOrderById = (id) => {
    return async (dispatch, getState) => {
        try {
            dispatch(getOrderRequest())

            const { user: { user } } = getState()
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${user.token}`
                }
            }

            const { data } = await axios.get(`/api/orders/${id}`, config)

            dispatch(getOrderSuccess(data))
        } catch (e) {
            dispatch(getOrderFail(e.response && e.response.data.message
                ? e.response.data.message
                : e.message
            ))
        }
    }
}

export const {
    add, remove, reset,
    cart_saveShippingAddress, cart_savePaymentMethod,
    createOrderRequest, createOrderSuccess, createOrderFail,
    getOrderRequest, getOrderSuccess, getOrderFail
} = cartSlice.actions;
const cartReducer = cartSlice.reducer
export default cartReducer;