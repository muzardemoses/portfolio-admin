import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { colorPalettes } from "@/utils/colors/colorPalettes";

const initialState = {
    themeColor: "default" as keyof typeof colorPalettes,
}

const themeColorSlice = createSlice({
    name: "themeColor",
    initialState,
    reducers: {
        changeColor: (state, action) => {
            state.themeColor = action.payload
        }
    }
});

export const {
    changeColor,
} = themeColorSlice.actions;

export const selectThemeColor = (state: RootState) => state.themeColor.themeColor;

export default themeColorSlice.reducer