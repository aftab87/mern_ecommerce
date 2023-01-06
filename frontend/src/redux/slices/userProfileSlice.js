import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    profile: {}
}

export const userProfileSlice = createSlice({
    name: 'userProfile',
    initialState,
    reducers: {
        userProfileRequest: state => {
            state.loading = true;
            state.error = null;
        },
        userProfileSuccess: (state, { payload }) => {
            state.profile = payload;
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
            state.profile = payload;
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

export const getUserProfile = (id) => {
    return async (dispatch, getState) => {
        try {
            dispatch(userProfileRequest({}))

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

export const updateUserProfile = (profile) => {
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
            //TODO: update header after updating profile
            const { data } = await axios.put(`/api/users/profile`, profile, config)

            dispatch(userProfileUpdateSuccess(data))
        } catch (e) {
            dispatch(userProfileUpdateFail(e.response && e.response.data.message
                ? e.response.data.message
                : e.message
            ))
        }
    }
}

export const {
    userProfileRequest, userProfileSuccess, userProfileFail,
    userProfileUpdateRequest, userProfileUpdateSuccess, userProfileUpdateFail, userProfileUpdateReset
} = userProfileSlice.actions;
const userProfileReducer = userProfileSlice.reducer
export default userProfileReducer;