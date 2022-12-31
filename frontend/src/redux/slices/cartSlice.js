import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios';

const initialState = {
    cartItems: localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []
}

export const cartSlice = createSlice({
    name: 'cartItems',
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
        },
        remove: (state, { payload }) => {
            state.cartItems = state.cartItems.filter(curItem => curItem.product !== payload)
        }
    }
})

export const addToCart = (id, qty) => {
    return async (dispatch, getState) => {
        const { data: { _id, name, image, price, countInStock } } = await axios.get(`/api/products/${id}`)
        qty = (countInStock === 0) ? 0
        : (qty < 0) ? 1
        : (qty > countInStock) ? countInStock : qty
        localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))

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
        localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
    }
}

export const { add, remove } = cartSlice.actions;
const cartReducer = cartSlice.reducer
export default cartReducer;