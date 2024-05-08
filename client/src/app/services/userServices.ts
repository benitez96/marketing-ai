import { storeToken, deleteToken } from '@/actions/auth';
import { api } from '@/utils/axios'
import { ILogin } from 'interfaces/user';
import User from 'entities/user';

export interface LoginResponse {
    access_token: string;
    success: boolean
}

export const login = async (user: ILogin): Promise<any> => {
    try {
        const form = new FormData();
        form.append('username', user.username);
        form.append('password', user.password);
        const { data, status } = await api.post('/users/signin', form, { headers: { "Content-Type": "multipart/form-data" } })
        if (status === 200) {
            await storeToken(data)
            return {
                brands: data.brands,
                username: data.username,
                token_type: data.token_type,
                id: data.id,
                email: data.email,
                firstName: data.firstname,
                lastName: data.lastname,
                success: true,
                access_token: data.access_token,
            }
        }
        else {
            const user = User.init()
            return {
                ...user,
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

export const signUp = async (data: any): Promise<any> => {
    try {
        const response = await api.post('/users', data)
        if (response.status === 201) {
            await storeToken({ access_token: response.data.access_token })
            return {
                brands: response.data.brands,
                username: response.data.username,
                token_type: response.data.token_type,
                id: response.data.id,
                email: response.data.email,
                firstName: response.data.firstname,
                lastName: response.data.lastname,
                success: true,
                access_token: response.data.access_token,
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

// export const logout = async () => {
//     await deleteToken()
// }
