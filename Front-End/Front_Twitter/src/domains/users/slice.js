import { createSlice }from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'user',
    initialState: {     
    },
    reducers: {
        setUser: (state, action) => {
            state.username = action.payload.username;
            state.id = action.payload.id;
        }
    },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;