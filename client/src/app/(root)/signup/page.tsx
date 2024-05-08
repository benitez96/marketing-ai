import { Onboarding } from '@/components/sign-up/Onboarding'
import { getUser } from '@/services/server/userService'
import { redirect } from 'next/navigation'
import React from 'react'

const SignUpPage = async () => {
    const user = await getUser()
    if ((user !== null && user !== undefined) && user.id !== undefined && user.brands.length > 0) {
        redirect('/dashboard')
    }
    else {
        return (
            <Onboarding />
        )
    }
}


export default SignUpPage
