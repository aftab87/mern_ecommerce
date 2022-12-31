import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios';

const initialState = {
    loading: false,
    products: []
}

export const productListSlice = createSlice({
    name: 'productList',
    initialState,
    reducers: {
        request: (state, { payload }) => {
            state.loading = true;
        },
        save: (state, { payload }) => {
            state.products = payload;
            state.loading = false;
        },
        fail: (state, { payload }) => {
            state.error = payload;
            state.loading = false;
        },
    },
})

export const getProductsList = () => {
    return async dispatch => {
        dispatch(request([]))
        try {
            const { data } = await axios.get(`/api/products/`);
            dispatch(save(data))
        } catch (e) {
            dispatch(fail(e.response && e.response.data.message
                ? e.response.data.message
                : e.message
            ))
        }
    }
}

export const { request, save, fail } = productListSlice.actions;
const productListReducer = productListSlice.reducer;
export default productListReducer;