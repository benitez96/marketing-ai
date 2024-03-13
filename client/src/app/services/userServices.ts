import { storeToken, deleteToken } from '@/actions/auth';
import { request } from '@/utils/axios'
import { ILogin } from 'interfaces/user';

export interface LoginResponse {
    access_token: string;
    success: boolean
}

export const login = async (user: ILogin): Promise<LoginResponse> => {
    try {
        const form = new FormData();
        form.append('username', user.username);
        form.append('password', user.password);
        const { data, status } = await request.post('/users/signin', form, { headers: { "Content-Type": "multipart/form-data" } })
        if (status === 200) {
            await storeToken(data)
            return {
                success: true,
                access_token: data.access_token,
            }
        }
        else {
            return {
                success: false,
                access_token: '',
            }
        }
    }
    catch (err) {
        console.error(err)
        return {
            success: false,
            access_token: '',
        }
    }
}


export const logout = async () => {
    await deleteToken()
}