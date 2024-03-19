"use client"
import React, { createContext, useCallback, useMemo, useState } from "react";
interface IUser {
    name: string
}
type ThemeContextType = {
    user: IUser,
    handleUser: (user: IUser) => void
};

export const ThemeContext = createContext<ThemeContextType>(null!)

interface Props {
    children: React.ReactNode
}

export default function ThemeProvider({ children }: Props) {
    const [currentUser, setCurrentUser] = useState<IUser>({ name: '' });

    const handleUser = useCallback((user: IUser) => {
        setCurrentUser(user);
    }, [currentUser]);

    const contextValue = useMemo(() => ({
        user: currentUser,
        handleUser
    }), [currentUser, handleUser]);

    return (
        <ThemeContext.Provider value={contextValue}>
            {children}
        </ThemeContext.Provider>
    )
}