import { createSlice } from '@reduxjs/toolkit'
import { UserType } from '../utils/typeDef';

const initialState: UserType = {
    name: "",
    email: "",
    password: "",
    token: "",
    username: "",
    icon: "",
    loggedIn: false
}

export const userSlice = createSlice({
    name: "user",
    initialState: { value: initialState },
    reducers: {
        login: (state, action) => {
            state.value = { ...action.payload, loggedIn: true };
        },

        logout: (state) => {
            state.value = { ...initialState, loggedIn: false }
        }
    }
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
