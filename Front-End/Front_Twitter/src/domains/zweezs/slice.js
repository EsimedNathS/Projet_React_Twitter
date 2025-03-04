import { createSlice }from "@reduxjs/toolkit";

const zweezSlice = createSlice({
    name: 'zweez',
    initialState: {
        content : "Mon titre",
        like : 0,
        comment : [],
        time : "today",
    },
    reducers: {
        addZweez: (state, action) => {
            state = state.push(action.payload)
        }
    }

});

export const {addZweez} = zweezSlice.actions;
export default zweezSlice.reducer;