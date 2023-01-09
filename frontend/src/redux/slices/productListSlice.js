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
        deleteProductRequest: state => {
            state.errorDelete = null
        },
        deleteProductSuccess: (state, { payload }) => {
            state.errorDelete = null
            state.products = payload
        },
        deleteProductFail: (state, { payload }) => {
            state.errorDelete = payload
        },
        deleteProductReset: (state, { payload }) => {
            state.errorDelete = null
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

export const deleteProduct = id => {
    return async (dispatch, getState) => {
        try {
            dispatch(deleteProductRequest())

            const {
                user: { user },
            } = getState()
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${user.token}`,
                },
            }

            const { data } = await axios.delete(`/api/products/${id}`, config)

            dispatch(deleteProductSuccess(data))
        } catch (e) {
            dispatch(
                deleteProductFail(
                    e.response && e.response.data.message
                        ? e.response.data.message
                        : e.message
                )
            )
        }
    }
}

export const {
    request, save, fail,
    deleteProductRequest, deleteProductSuccess, deleteProductFail, deleteProductReset,
} = productListSlice.actions;
const productListReducer = productListSlice.reducer;
export default productListReducer;