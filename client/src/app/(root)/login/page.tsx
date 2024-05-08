import { getToken } from '@/actions/auth'
import Login from '@/components/login/Login'
import { redirect } from 'next/navigation'

const LoginPage = async () => {
    // const token = await getToken()
    // const hasBrand = true

    // if (token !== undefined && token.value.length > 0) {
    //     if (!hasBrand) {
    //         redirect('/signup')
    //     }
    //     else {
    //         redirect('/dashboard')
    //     }
    // }

    return (
        <div className='flex align-middle justify-center mt-8'><Login /></div>
    )
}

export default LoginPage
