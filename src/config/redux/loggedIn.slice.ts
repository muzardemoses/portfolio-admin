import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";

const initialState = {
    loggedInId: null as string | null,
}

const loggedInSlice = createSlice({
    name: "loggedIn",
    initialState,
    reducers: {
        addId: (state, action) => {
            state.loggedInId = action.payload
        },
        removeId: (state) => {
            state.loggedInId = null
        }
    }
});

export const {
    addId,
    removeId
} = loggedInSlice.actions;

export const selectLoggedInId = (state: RootState) => state.loggedIn.loggedInId

export default loggedInSlice.reducer