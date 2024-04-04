"use client"
import { deleteToken } from "@/actions/auth";
import { api } from "@/utils/axios";
import { useRouter } from "next/navigation";
import React, { createContext, useCallback, useEffect, useMemo, useState } from "react";
import { usePathname } from 'next/navigation'

interface IUser {
    id: number, username: string, email: string
}
type ThemeContextType = {
    user: IUser,
    isLoading: boolean
    handleUser: (user: IUser) => void
};

export const ThemeContext = createContext<ThemeContextType>(null!)

interface Props {
    children: React.ReactNode
}

export default function ThemeProvider({ children }: Props) {
    const router = useRouter()
    const pathname = usePathname()
    const [currentUser, setCurrentUser] = useState<IUser>({ id: 0, username: '', email: '' });
    const [isLoading, setIsLoading] = useState<boolean>(true)

    useEffect(() => {
        const getUser = async () => {
            try {
                const user = (await api.get('/users/me')).data
                setCurrentUser(user)
                setIsLoading(false)
            } catch (error) {
                setIsLoading(false)
                await deleteToken()
                if (pathname.includes("dashboard")) {
                    return router.push('/login')
                }
            }
        }
        getUser()
    }, [])

    const handleUser = useCallback((user: IUser) => {
        setCurrentUser(user);
    }, [currentUser]);

    const contextValue = useMemo(() => ({
        user: currentUser,
        handleUser,
        isLoading
    }), [currentUser, handleUser, isLoading]);

    return (
        <ThemeContext.Provider value={contextValue}>
            {children}
        </ThemeContext.Provider>
    )
}