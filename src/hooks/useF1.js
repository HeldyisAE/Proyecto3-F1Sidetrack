import { useContext } from "react";
import { F1DataContext } from "../context/F1DataContext";

export function useF1() {
    return useContext(F1DataContext);
}