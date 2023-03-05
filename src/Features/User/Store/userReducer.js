import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    firstName: 'Guest',
    email: '',
    isLoggedIn: false
}

const userReducer = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: state => {
            state.isLoggedIn = true
        },
        logout: state => {
            state.isLoggedIn = false
        }
    }
})

export const { login, logout } = userReducer.actions
export default userReducer.reducer
