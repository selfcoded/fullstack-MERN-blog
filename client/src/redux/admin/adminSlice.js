import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    currentUser: null,
    error: null,
    loading: false,
}

const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        loginStart: (state) => {
            state.loading = true
        },
        loginSuccess: (state, action) => {
            state.currentUser = action.payload
            state.loading = false
        },
        loginFailure: (state, action) => {
            state.error = action.payload
            state.loading = false
        }
    }
})

export const { 
    loginStart,
    loginSuccess,
    loginFailure 
} = userSlice.actions

export const userReducer = userSlice.reducer