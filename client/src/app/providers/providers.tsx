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
    currentBrand: IBrand | null
    brands: IBrand[]
    isLoading: boolean
    handleUser: (user: IUser) => void
    handleBrand: (id: string) => void
    clearUser: () => void
    logoutUser: () => Promise<void>
};

export const UserContext = createContext<ThemeContextType>(null!)

interface Props {
    children: React.ReactNode
}

interface IBrand {
    id: number;
    name: string;
    target_audience: string;
    current_email_list_size: number;
    niche: string;
}

export default function UserProvider({ children }: Props) {
    const router = useRouter()
    const pathname = usePathname()
    const [currentUser, setCurrentUser] = useState<IUser>(User.init());
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [currentBrand, setCurrentBrand] = useState<IBrand | null>(null)
    const [brands, setBrands] = useState<IBrand[]>([])

    useEffect(() => {
        const getUser = async () => {
            try {
                const user = (await api.get('/users/me')).data
                setCurrentUser(new User(user.id, user.username, user.firstname, user.lastname, user.email, user.brands))
                setCurrentBrand(user.brands[0])
                setBrands(user.brands)
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

    // const handleBrand = (id: string) => {
    //     const selectedBrand = currentUser.brands.find((userBrand: any) => userBrand.id === Number(id))
    //     setCurrentBrand(selectedBrand)
    // };

    const handleBrand = useCallback((id: string) => {
        const selectedBrand = brands.find((userBrand: any) => userBrand.id === Number(id))
        if (selectedBrand !== undefined) {
            setCurrentBrand(selectedBrand)
        }
    }, [currentBrand]);

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
        currentBrand,
        handleUser,
        clearUser,
        isLoading,
        logoutUser,
        handleBrand,
        brands
    }), [currentUser, handleUser, isLoading, currentBrand, brands]);

    return (
        <UserContext.Provider value={contextValue}>
            {children}
        </UserContext.Provider>
    )
}