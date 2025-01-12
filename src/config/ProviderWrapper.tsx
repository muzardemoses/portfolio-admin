"use client";
import { store, persistor } from "@/config/redux/store";
import React from "react";
import { Provider } from "react-redux";
import { Toaster } from 'react-hot-toast';
import { PersistGate } from "redux-persist/integration/react";
import MUIProvider from "./MUIProvider";



const ProviderWrapper = ({ children }: { children: React.ReactNode }) => {


    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <MUIProvider>
                    {children}
                </MUIProvider>
            </PersistGate>
            <Toaster />
        </Provider>
    );
};

export default ProviderWrapper;
