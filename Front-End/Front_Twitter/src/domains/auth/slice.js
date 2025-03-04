import { createAsyncThunk, createSlice }from "@reduxjs/toolkit";
import { login } from "./api.js";
import { setUser } from "../users/slice";


export const signIn = createAsyncThunk('authentification/login', async (object) => {
    return await login(object.email, object.password);
})

const authSlice = createSlice({
    name: 'authentification',
    initialState: {     
        isConnected : false,
        token : 0
    },
    reducers: {
        setToken: (state, action) => {
            state = state.push(
                isConnected = true,
                token = action.payload
            )
        }
    },
    extraReducers: (builder) => {
        builder.addCase(signIn.fulfilled, (state, action) => {
            state.token = action.payload.accessToken;
            state.isConnected = true;
        })
        
    }
});

export const { replaceToken } = authSlice.actions;
export default authSlice.reducer;