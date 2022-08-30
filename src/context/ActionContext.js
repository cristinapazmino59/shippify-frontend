import {createContext, useState} from "react";

export const initialState = {
    isFind: false, 
    toggleAction: () => null, 
 };

export const ActionContext = createContext(initialState);

export const ActionContextProvider = ({children}) => {
    const [isFindAction, setIsFindAction] = useState({
        isFind: false,
    });

    const toggleAction = () => {
        setIsFindAction({
            isFind: !isFindAction.isFind,
        });
    }
    return <ActionContext.Provider value={{ ...isFindAction, toggleAction }}>
            {children}
           </ActionContext.Provider>
};