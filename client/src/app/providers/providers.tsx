"use client"
import { deleteToken } from "@/actions/auth";
import { api } from "@/utils/axios";
import { useRouter } from "next/navigation";
import React, { createContext, useCallback, useEffect, useMemo, useState } from "react";
import { usePathname } from 'next/navigation'
import { IUser } from "interfaces/user";
import User from "entities/user";


type ThemeContextType = {
    user: IUser,
    isLoading: boolean
    handleUser: (user: IUser) => void
    clearUser: () => void
    logoutUser: () => Promise<void>
};

export const UserContext = createContext<ThemeContextType>(null!)

interface Props {
    children: React.ReactNode
}

export default function UserProvider({ children }: Props) {
    const router = useRouter()
    const pathname = usePathname()
    const [currentUser, setCurrentUser] = useState<IUser>(User.init());
    const [isLoading, setIsLoading] = useState<boolean>(true)

    useEffect(() => {
        const getUser = async () => {
            try {
                const user = (await api.get('/users/me')).data
                setCurrentUser(new User(user.id, user.username, user.firstname, user.lastname, user.email, user.brands))
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

    const logoutUser = useCallback(async () => {
        setIsLoading(true)
        setCurrentUser(User.init())
        await deleteToken()
        router.push('/')
        setIsLoading(false)
    }, [currentUser]);


    const clearUser = () => {
        setIsLoading(true)
        setCurrentUser(User.init())
        setIsLoading(false)
    }

    const contextValue = useMemo(() => ({
        user: currentUser,
        handleUser,
        clearUser,
        isLoading,
        logoutUser
    }), [currentUser, handleUser, isLoading]);

    return (
        <UserContext.Provider value={contextValue}>
            {children}
        </UserContext.Provider>
    )
}