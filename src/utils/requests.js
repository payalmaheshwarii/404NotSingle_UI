import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
    name: 'request',
    initialState: null,
    reducers: {
        addRequest : (state, action) => action.payload,
        removeRequest: (state, action) => {
            let newArr = state.filter((req) => req._id != action.payload)
            return newArr;
        },
        removeRequests : (state, action) => null
    }
})

export const {addRequest, removeRequests, removeRequest} = requestSlice.actions;
export default requestSlice.reducer;