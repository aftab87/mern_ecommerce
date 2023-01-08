import { createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const initialState = {
    user: localStorage.getItem("user")
        ? JSON.parse(localStorage.getItem("user"))
        : null,
    orders: [],
    users: [],
    profile: {}
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        userRegisterRequest: state => {
            state.loading = true
            state.error = null
        },
        userRegisterSuccess: (state, { payload }) => {
            state.user = payload
            state.error = null
            state.loading = false
        },
        userRegisterFail: (state, { payload }) => {
            state.error = payload
            state.loading = false
        },
        userLoginRequest: state => {
            state.loading = true
            state.error = null
        },
        userLoginSuccess: (state, { payload }) => {
            state.user = payload
            state.error = null
            state.loading = false
        },
        userLoginFail: (state, { payload }) => {
            state.error = payload
            state.loading = false
        },
        userLogout: (state, { payload }) => {
            state.user = null
            state.order = null
            state.loading = false
        },
        userProfileRequest: state => {
            state.loading = true
            state.error = null
        },
        userProfileSuccess: (state, { payload }) => {
            let curUser = state.user
            curUser.name = payload.name || curUser.name
            curUser.email = payload.email || curUser.email
            state.user = curUser
            state.error = null
            state.loading = false
        },
        userProfileFail: (state, { payload }) => {
            state.error = payload
            state.loading = false
        },
        userProfileUpdateRequest: state => {
            state.loading = true
            state.error = null
        },
        userProfileUpdateSuccess: (state, { payload }) => {
            state.user = payload
            state.success = true
            state.error = null
            state.loading = false
        },
        userProfileUpdateFail: (state, { payload }) => {
            state.error = payload
            state.loading = false
        },
        userProfileUpdateReset: (state, { payload }) => {
            state.error = payload
            state.loading = false
        },
        getMyOrdersRequest: state => {
            state.errorOrders = null
            state.orders = []
            state.loadingOrders = true
        },
        getMyOrdersSuccess: (state, { payload }) => {
            state.errorOrders = null
            state.loadingOrders = false
            state.orders = payload
        },
        getMyOrdersFail: (state, { payload }) => {
            state.errorOrders = payload
            state.loadingOrders = false
        },
        getUsersRequest: state => {
            state.errorUsers = null
            state.users = []
            state.loadingUsers = true
        },
        getUsersSuccess: (state, { payload }) => {
            state.errorUsers = null
            state.loadingUsers = false
            state.users = payload
        },
        getUsersFail: (state, { payload }) => {
            state.errorUsers = payload
            state.loadingUsers = false
        },
        deleteUserRequest: state => {
            state.errorDelete = null
        },
        deleteUserSuccess: (state, { payload }) => {
            state.errorDelete = null
            state.users = payload
        },
        deleteUserFail: (state, { payload }) => {
            state.errorDelete = payload
        },
        getProfileRequest: state => {
            state.errorProfile = null
            state.profile = {}
            state.loadingProfile = true
        },
        getProfileSuccess: (state, { payload }) => {
            state.errorProfile = null
            state.loadingProfile = false
            state.profile = payload
        },
        getProfileFail: (state, { payload }) => {
            state.errorProfile = payload
            state.loadingProfile = false
        },
    },
})

export const login = (email, password) => {
    return async dispatch => {
        try {
            dispatch(userLoginRequest({}))
            const config = {
                headers: {
                    "Content-Type": "application/json",
                },
            }

            const { data } = await axios.post(
                "/api/users/login",
                { email, password },
                config
            )
            localStorage.setItem("user", JSON.stringify(data))

            dispatch(userLoginSuccess(data))
        } catch (e) {
            dispatch(
                userLoginFail(
                    e.response && e.response.data.message
                        ? e.response.data.message
                        : e.message
                )
            )
        }
    }
}

export const register = (name, email, password) => {
    return async dispatch => {
        try {
            dispatch(userRegisterRequest({}))
            const config = {
                headers: {
                    "Content-Type": "application/json",
                },
            }

            const { data } = await axios.post(
                "/api/users",
                { name, email, password },
                config
            )
            localStorage.setItem("user", JSON.stringify(data))

            dispatch(userRegisterSuccess(data))
            dispatch(userLoginSuccess(data))
        } catch (e) {
            dispatch(
                userRegisterFail(
                    e.response && e.response.data.message
                        ? e.response.data.message
                        : e.message
                )
            )
        }
    }
}

export const logout = () => {
    return async dispatch => {
        localStorage.removeItem("user")
        dispatch(userLogout())
    }
}

export const getUserProfile = () => {
    return async (dispatch, getState) => {
        try {
            dispatch(userProfileRequest())

            const {
                user: { user },
            } = getState()
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${user.token}`,
                },
            }

            const { data } = await axios.get(`/api/users/${user._id}`, config)

            dispatch(userProfileSuccess(data))
        } catch (e) {
            dispatch(
                userProfileFail(
                    e.response && e.response.data.message
                        ? e.response.data.message
                        : e.message
                )
            )
        }
    }
}
export const getProfile = id => {
    return async (dispatch, getState) => {
        try {
            dispatch(getProfileRequest())

            const {
                user: { user },
            } = getState()
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${user.token}`,
                },
            }

            const { data } = await axios.get(`/api/users/${id}`, config)

            dispatch(getProfileSuccess(data))
        } catch (e) {
            dispatch(
                getProfileFail(
                    e.response && e.response.data.message
                        ? e.response.data.message
                        : e.message
                )
            )
        }
    }
}

export const updateUserProfile = updatedUser => {
    return async (dispatch, getState) => {
        try {
            dispatch(userProfileUpdateRequest())

            const {
                user: { user },
            } = getState()
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${user.token}`,
                },
            }

            const { data } = await axios.put(
                `/api/users/profile`,
                updatedUser,
                config
            )

            dispatch(userProfileUpdateSuccess(data))
        } catch (e) {
            dispatch(
                userProfileUpdateFail(
                    e.response && e.response.data.message
                        ? e.response.data.message
                        : e.message
                )
            )
        }
    }
}

export const getUsersList = () => {
    return async (dispatch, getState) => {
        try {
            dispatch(getUsersRequest())

            const {
                user: { user },
            } = getState()
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${user.token}`,
                },
            }

            const { data } = await axios.get(`/api/users`, config)

            dispatch(getUsersSuccess(data))
        } catch (e) {
            dispatch(
                getUsersFail(
                    e.response && e.response.data.message
                        ? e.response.data.message
                        : e.message
                )
            )
        }
    }
}

export const deleteUser = id => {
    return async (dispatch, getState) => {
        try {
            dispatch(deleteUserRequest())

            const {
                user: { user },
            } = getState()
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${user.token}`,
                },
            }

            const { data } = await axios.delete(`/api/users/${id}`, config)

            dispatch(deleteUserSuccess(data))
        } catch (e) {
            dispatch(
                deleteUserFail(
                    e.response && e.response.data.message
                        ? e.response.data.message
                        : e.message
                )
            )
        }
    }
}

export const getMyOrders = () => {
    return async (dispatch, getState) => {
        try {
            dispatch(getMyOrdersRequest())

            const {
                user: { user },
            } = getState()
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${user.token}`,
                },
            }

            const { data } = await axios.get(`/api/orders/myorders`, config)

            dispatch(getMyOrdersSuccess(data))
        } catch (e) {
            dispatch(
                getMyOrdersFail(
                    e.response && e.response.data.message
                        ? e.response.data.message
                        : e.message
                )
            )
        }
    }
}

export const {
    userRegisterRequest,
    userRegisterSuccess,
    userRegisterFail,
    userLoginRequest,
    userLoginSuccess,
    userLoginFail,
    userLogout,
    userProfileRequest,
    userProfileSuccess,
    userProfileFail,
    userProfileUpdateRequest,
    userProfileUpdateSuccess,
    userProfileUpdateFail,
    userProfileUpdateReset,
    getMyOrdersRequest,
    getMyOrdersSuccess,
    getMyOrdersFail,
    getUsersRequest,
    getUsersSuccess,
    getUsersFail,
    deleteUserRequest,
    deleteUserSuccess,
    deleteUserFail,
    getProfileRequest,
    getProfileSuccess,
    getProfileFail,
} = userSlice.actions
const userReducer = userSlice.reducer
export default userReducer
