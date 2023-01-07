import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios';

const initialState = {
    cartItems: localStorage.getItem('cartItems')
        ? JSON.parse(localStorage.getItem('cartItems'))
        : [],
    shippingAddress: localStorage.getItem('shippingAddress')
        ? JSON.parse(localStorage.getItem('shippingAddress'))
        : {},
    paymentMethod: localStorage.getItem('paymentMethod')
        ? JSON.parse(localStorage.getItem('paymentMethod'))
        : {},

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
        cart_saveShippingAddress: (state, { payload }) => {
            state.shippingAddress = payload
            localStorage.setItem('shippingAddress', JSON.stringify(payload))
        },
        cart_savePaymentMethod: (state, { payload }) => {
            state.paymentMethod = payload
            localStorage.setItem('paymentMethod', JSON.stringify(payload))
        }
    }
})

export const addToCart = (id, qty) => {
    return async (dispatch) => {
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

export const saveShippingAddress = (data) => {
    return async (dispatch) => {
        dispatch(cart_saveShippingAddress(data))
    }
}

export const savePaymentMethod = (data) => {
    return async (dispatch) => {
        dispatch(cart_savePaymentMethod(data))
    }
}

export const { add, remove, cart_saveShippingAddress, cart_savePaymentMethod } = cartSlice.actions;
const cartReducer = cartSlice.reducer
export default cartReducer;