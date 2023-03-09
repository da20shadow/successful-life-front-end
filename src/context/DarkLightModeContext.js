import {createContext,useContext} from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const StateContext =  createContext();

const initialModeState = 'dark';

export const ThemeModeContextProvider = ({children}) => {

    const [mode,setMode] = useLocalStorage('theme',initialModeState)

    const changeThemeMode = (changedMode) => {
        setMode(changedMode);
    }

    return (
        <StateContext.Provider
            value={ {mode,changeThemeMode}}
        >
            {children}
        </StateContext.Provider>
    )
}

export const useThemeModeStateContext = () => useContext(StateContext);