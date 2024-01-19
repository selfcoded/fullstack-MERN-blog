import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    currentUser: null,
    error: null,
    loading: false,
    admin: false
}

const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        reInitial: (state) => {
            state.error = null,
            state.loading = null,
            state.currentUser = null
        },
        loginStart: (state) => {
            state.loading = true
        },
        loginSuccess: (state, action) => {
            state.error = null
            state.loading = false
            state.currentUser = action.payload
        },
        loginFailure: (state, action) => {
            state.loading = false
            state.error = action.payload
        },
        checkAdmin: (state, action) => {
            state.admin = action.payload
        }
    }
})

export const { 
    reInitial,
    loginStart,
    loginSuccess,
    loginFailure,
    checkAdmin 
} = userSlice.actions

export const userReducer = userSlice.reducer