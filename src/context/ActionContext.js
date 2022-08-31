import {createContext, useState} from "react";

export const initialState = {
    isFind: false, 
    driver: null,
    toggleAction: () => null, 
    setDriver: () => null, 
 };

export const ActionContext = createContext(initialState);

export const ActionContextProvider = ({children}) => {
    const [isFindAction, setIsFindAction] = useState({
        isFind: false,
    });

    const [actualDriver, setActualDriver] = useState({
        driver: null,
    });

    const toggleAction = () => {
        setIsFindAction({
            isFind: !isFindAction.isFind,
        });
    }

    const setDriver = (driver) => {
        setActualDriver({
            driver: driver,
        });
    }

    return <ActionContext.Provider value={{ ...isFindAction, ...actualDriver, toggleAction, setDriver }}>
            {children}
           </ActionContext.Provider>
};