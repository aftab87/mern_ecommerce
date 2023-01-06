import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    user: localStorage.getItem('user')
        ? JSON.parse(localStorage.getItem('user'))
        : null,
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        userRegisterRequest: state => {
            state.loading = true;
            state.error = null;
        },
        userRegisterSuccess: (state, { payload }) => {
            state.user = payload;
            state.error = null;
            state.loading = false;
        },
        userRegisterFail: (state, { payload }) => {
            state.error = payload
            state.loading = false;
        },
        userLoginRequest: state => {
            state.loading = true;
            state.error = null;
        },
        userLoginSuccess: (state, { payload }) => {
            state.user = payload;
            state.error = null;
            state.loading = false;
        },
        userLoginFail: (state, { payload }) => {
            state.error = payload
            state.loading = false;
        },
        userLogout: (state, { payload }) => {
            state.user = null;
            state.loading = false;
        },
        userProfileRequest: state => {
            state.loading = true;
            state.error = null;
        },
        userProfileSuccess: (state, { payload }) => {
            let curUser = state.user;
            curUser.name = payload.name || curUser.name;
            curUser.email = payload.email || curUser.email;
            state.user = curUser;
            state.error = null;
            state.loading = false;
        },
        userProfileFail: (state, { payload }) => {
            state.error = payload
            state.loading = false;
        },
        userProfileUpdateRequest: state => {
            state.loading = true;
            state.error = null;
        },
        userProfileUpdateSuccess: (state, { payload }) => {
            state.user = payload;
            state.success = true;
            state.error = null;
            state.loading = false;
        },
        userProfileUpdateFail: (state, { payload }) => {
            state.error = payload
            state.loading = false;
        },
        userProfileUpdateReset: (state, { payload }) => {
            state.error = payload
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

export const getUserProfile = (id) => {
    return async (dispatch, getState) => {
        try {
            dispatch(userProfileRequest())

            const { user: { user } } = getState()
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${user.token}`
                }
            }

            const { data } = await axios.get(`/api/users/${id}`, config)

            dispatch(userProfileSuccess(data))
            dispatch(userProfileSuccess(data))
        } catch (e) {
            dispatch(userProfileFail(e.response && e.response.data.message
                ? e.response.data.message
                : e.message
            ))
        }
    }
}

export const updateUserProfile = (updatedUser) => {
    return async (dispatch, getState) => {
        try {
            dispatch(userProfileUpdateRequest())

            const { user: { user } } = getState()
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${user.token}`
                }
            }

            const { data } = await axios.put(`/api/users/profile`, updatedUser, config)

            dispatch(userProfileUpdateSuccess(data))
        } catch (e) {
            dispatch(userProfileUpdateFail(e.response && e.response.data.message
                ? e.response.data.message
                : e.message
            ))
        }
    }
}

export const { userRegisterRequest, userRegisterSuccess, userRegisterFail,
    userLoginRequest, userLoginSuccess, userLoginFail, userLogout,
    userProfileRequest, userProfileSuccess, userProfileFail,
    userProfileUpdateRequest, userProfileUpdateSuccess, userProfileUpdateFail, userProfileUpdateReset
} = userSlice.actions;
const userReducer = userSlice.reducer
export default userReducer;