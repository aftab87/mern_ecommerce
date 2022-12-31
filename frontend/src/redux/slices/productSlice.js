import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios';

const initialState = {
    loading: false,
    product: {}
}

export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        request: state => {
            state.loading = true;
        },
        save: (state, { payload }) => {
            state.product = payload;
            state.loading = false;
        },
        fail: (state, { payload }) => {
            state.error = payload;
            state.loading = false;
        }
    }
})

export const getProduct = (id) => {
    return async dispatch => {
        dispatch(request([]))
        try {
            const { data } = await axios.get(`/api/products/${id}`);
            dispatch(save(data))
        } catch (e) {
            dispatch(fail(e.response && e.response.data.message
                ? e.response.data.message
                : e.message
            ))
        }
    }
}

export const { request, save, fail } = productSlice.actions;
const productReducer = productSlice.reducer
export default productReducer;