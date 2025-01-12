"use client";
import React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useSavedColor } from "@/hooks/colors/getSavedColor";

// const savedColor = useSavedColor();

// const theme = createTheme({
//     palette: {
//         primary: {
//             main: useSavedColor().main, // The main color of your app
//             light: '#FF8580', // A lighter shade of the main color
//             dark: '#B53C2F',  // A darker shade of the main color
//             contrastText: '#fff', // Text color to ensure readability on primary backgrounds
//         },
//         // secondary: {
//         //     main: '#',
//         //     light: '#',
//         //     dark: '#',
//         //     contrastText: '#fff',
//         // },
//     },
// });

const MUIProvider = ({ children }: { children: React.ReactNode }) => {

    const savedColor = useSavedColor();

    const theme = createTheme({
        palette: {
            primary: {
                main: savedColor.main, // The main color of your app
                light: savedColor.light, // A lighter shade of the main color
                dark: savedColor.dark,  // A darker shade of the main color
                contrastText: savedColor.contrastText, // Text color to ensure readability on primary backgrounds
            },
        },
    });

    return (
        <div className="overflow-x-hidden">
            <ThemeProvider theme={theme}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    {children}
                </LocalizationProvider>
            </ThemeProvider>
        </div>
    );
};

export default MUIProvider;
