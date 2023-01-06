import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    user: localStorage.getItem('user')
        ? JSON.parse(localStorage.getItem('user'))
        : null
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        userRegisterRequest: state => {
            state.loading = true;
        },
        userRegisterSuccess: (state, { payload }) => {
            state.user = payload;
            state.loading = false;
        },
        userRegisterFail: (state, { payload }) => {
            state.error = payload
            state.loading = false;
        },
        userLoginRequest: state => {
            state.loading = true;
        },
        userLoginSuccess: (state, { payload }) => {
            state.user = payload;
            state.loading = false;
        },
        userLoginFail: (state, { payload }) => {
            state.error = payload
            state.loading = false;
        },
        userLogout: (state, { payload }) => {
            state.user = null;
            state.loading = false;
        }
    }
})

export const login = (email, password) => {
    return async dispatch => {
        try {
            dispatch(userLoginRequest({}))
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }

            const { data } = await axios.post('/api/users/login', { email, password }, config)
            localStorage.setItem('user', JSON.stringify(data))

            dispatch(userLoginSuccess(data))
        } catch (e) {
            dispatch(userLoginFail(e.response && e.response.data.message
                ? e.response.data.message
                : e.message
            ))
        }
    }
}

export const register = (name, email, password) => {
    return async dispatch => {
        try {
            dispatch(userRegisterRequest({}))
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }

            const { data } = await axios.post('/api/users', { name, email, password }, config)
            localStorage.setItem('user', JSON.stringify(data))

            dispatch(userRegisterSuccess(data))
            dispatch(userLoginSuccess(data))
        } catch (e) {
            dispatch(userRegisterFail(e.response && e.response.data.message
                ? e.response.data.message
                : e.message
            ))
        }
    }
}

export const logout = () => {
    return async dispatch => {
        localStorage.removeItem('user')
        dispatch(userLogout())
    }
}

export const { userRegisterRequest, userRegisterSuccess, userRegisterFail, userLoginRequest, userLoginSuccess, userLoginFail, userLogout } = userSlice.actions;
const userReducer = userSlice.reducer
export default userReducer;