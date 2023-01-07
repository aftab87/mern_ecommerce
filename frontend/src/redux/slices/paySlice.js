import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
import { resetCart } from './cartSlice';

const initialState = {}

export const paySlice = createSlice({
    name: 'pay',
    initialState,
    reducers: {
        payOrderRequest: state => {
            state.error = null;
            state.loading = true;
        },
        payOrderSuccess: state => {
            state.error = null;
            state.loading = false;
            state.success = true;
        },
        payOrderFail: (state, { payload }) => {
            state.error = payload;
            state.loading = false;
        },
        payOrderReset: (state) => {
            state = {}
        },
    }
})

export const pay = (id, paymentResult) => {
    return async (dispatch, getState) => {
        try {
            dispatch(payOrderRequest())

            const { user: { user } } = getState()
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${user.token}`
                }
            }

            const { data } = await axios.put(`/api/orders/${id}/pay`, paymentResult, config)

            dispatch(payOrderSuccess(data))
            dispatch(resetCart())
        } catch (e) {
            dispatch(payOrderFail(e.response && e.response.data.message
                ? e.response.data.message
                : e.message
            ))
        }
    }
}

export const {
    payOrderRequest, payOrderSuccess, payOrderFail, payOrderReset
} = paySlice.actions;
const payReducer = paySlice.reducer
export default payReducer;