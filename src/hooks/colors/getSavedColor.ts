// src/hooks/useSavedColor.ts
import { colorPalettes } from "@/utils/colors/colorPalettes";
import { selectThemeColor } from "@/config/redux/themeColor.slice";
import { useAppSelector } from "@/config/redux/types";

type ColorPaletteKeys = keyof typeof colorPalettes;

// Custom hook
export const useSavedColor = () => {
    const savedColorId = useAppSelector(selectThemeColor) as ColorPaletteKeys;
    return colorPalettes[savedColorId] || colorPalettes.default;
};
