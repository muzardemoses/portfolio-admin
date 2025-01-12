import { useState, useEffect, Dispatch, SetStateAction } from "react";


export const useDarkSide = (): [string, Dispatch<SetStateAction<string>>] => {
    const [theme, setTheme] = useState("dark"); // Default theme to "dark"
    const colorTheme = theme === "dark" ? "light" : "dark";

    useEffect(() => {
        const root = window.document.documentElement;
        root.classList.remove(colorTheme);
        root.classList.add(theme);
        localStorage.setItem('theme', theme);
    }, [theme, colorTheme]);

    return [colorTheme, setTheme];
}

