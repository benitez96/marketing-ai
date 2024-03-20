"use client"

import { deleteToken } from "@/actions/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";


interface Props {
    user: any;
    children: React.ReactNode
}

export const CheckAuth = ({ user, children }: Props) => {
    const router = useRouter()

    // useEffect(() => {
    //     const deleteCookie = async () => {
    //         await deleteToken()
    //     }
    //     if (user === null) {
    //         console.log(user)

    //         deleteCookie()
    //         router.push('/login')
    //     }
    // }, [])

    return (
        <>
            {children}
        </>
    )

}