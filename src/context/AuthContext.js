import { createContext, useEffect, useState } from "react";
export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState({});
    const updateUser=(userData)=>{
        setUser(userData);
        localStorage.setItem('user',JSON.stringify(userData));
    }
    return (
        <AuthContext.Provider value={{user,updateUser}}>
            {children}
        </AuthContext.Provider>
    )
}
