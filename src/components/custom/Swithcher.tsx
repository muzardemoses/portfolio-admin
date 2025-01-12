import React, { useState } from "react";
// import { DarkModeSwitch } from "react-toggle-dark-mode";
import { useDarkSide } from "@/hooks/colors/useDarkSide";

export const Switcher = () => {
    const [colorTheme, setTheme] = useDarkSide(); // Using destructured return
    const [darkSide, setDarkSide] = useState(
        colorTheme === "dark" ? true : false
    );

    const toggleDarkMode = (checked: boolean | ((prevState: boolean) => boolean)) => {
        setTheme(colorTheme); // Passing current theme to `setTheme`
        setDarkSide(checked);
    };

    return (
        <>
            {/* <DarkModeSwitch
                checked={darkSide} // State for dark mode
                onChange={toggleDarkMode} // Function to toggle dark mode
                size={30} // Size of the switch component
                moonColor="rgb(31 41 55)" // Color for moon icon
                sunColor="rgb(209 213 219)" // Color for sun icon
            /> */}
        </>
    );
}
