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
        token : localStorage.getItem("token")
    },
    reducers: {
        setIsConnected: (state, action) => {
            state.isConnected  = action.payload
        },
        disconnect: (state) => {
            state.isConnected = false
            token = null
        }
    },
    extraReducers: (builder) => {
        builder.addCase(signIn.fulfilled, (state, action) => {
            state.token = action.payload.accessToken;
            state.isConnected = true;
        })
        
    }
});

export const { replaceToken, setIsConnected} = authSlice.actions;
export default authSlice.reducer;