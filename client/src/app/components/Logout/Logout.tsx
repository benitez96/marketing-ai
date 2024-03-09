'use client'

import { deleteToken } from '@/actions/auth'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const Signout = () => {
    const [loading, setLoading] = useState<boolean>(true)
    const router = useRouter()
    useEffect(() => {
        const signout = async () => {
            await deleteToken()
            setLoading(false)
            router.push('/')
        }
        signout()
    }, [])

    return (
        <div>
            {
                loading && <h1>Loading</h1>
            }
        </div>
    );
}

export default Signout