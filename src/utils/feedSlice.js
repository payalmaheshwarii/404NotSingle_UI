import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
    name: 'feed',
    initialState: null,
    reducers: {
        addFeed: (state, action) =>  action.payload,
        removeFeed: (state, action) => null,
        removeUser: (state, action) => {
            const newFeed = state.filter((user) => user._id != action.payload);
            return newFeed;
        }
    }
});

export const {addFeed, removeFeed, removeUser} = feedSlice.actions;
export default feedSlice.reducer;