import { createContext, useState } from "react";

export const userContext = createContext();

export const UserProvider = ({children}) => {
    const [value, setValue] = useState({
        name: "",
        userName: "",
        email: "",
        password: "",
    });

    return (
        <userContext.Provider value={{value, setValue}}>
            {children}
        </userContext.Provider>
    )
}