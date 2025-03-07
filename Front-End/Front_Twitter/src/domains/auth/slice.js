import { createAsyncThunk, createSlice }from "@reduxjs/toolkit";
import { login } from "./api.js";
import { signupService } from "./service.js";

export const signIn = createAsyncThunk('authentification/login', async (object) => {
    return await login(object.email, object.password);
})

export const signUp = createAsyncThunk('authentification/signup', async (object) => {
    return await signupService(object.email, object.password, object.username);
})

const authSlice = createSlice({
    name: 'authentification',
    initialState: {     
        isConnected : false,
        token : localStorage.getItem("token")
    },
    reducers: {
        setIsConnected: (state, action) => {
            state.isConnected  = action.payload
        },
        disconnect: (state) => {
            localStorage.clear();
            state.isConnected = false
            state.token = null
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(signIn.fulfilled, (state, action) => {
            state.token = action.payload.accessToken;
            state.isConnected = true;
        })
        .addCase(signUp.fulfilled, (state, action) => {
            console.log(action.payload);
            state.token = action.payload;
            state.isConnected = true;
        })
        
    }
});

export const { replaceToken, setIsConnected, disconnect} = authSlice.actions;
export default authSlice.reducer;