import { combineReducers } from "@reduxjs/toolkit";
import loggedInSlice from "./loggedIn.slice";
import toggleSlice from "./toggle.slice";
import themeColorSlice from "./themeColor.slice";


const rootReducers = combineReducers({
    loggedIn: loggedInSlice,
    toggle: toggleSlice,
    themeColor: themeColorSlice,
});

export default rootReducers;