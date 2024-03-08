import { storeToken } from '@/actions/auth';
import { request } from '@/utils/axios'
import { ILogin, IToken } from 'interfaces/user';
import HttpService from 'network/http';

export interface LoginResponse {
    access_token: string;
    success: boolean
}


export const login = async (user: any): Promise<LoginResponse> => {
    try {
        const form = new FormData();
        form.append('username', user.username);
        form.append('password', user.password);
        const apiService = new HttpService()
        const { request, cancel } = await apiService.post<FormData>('/users/signin', form)
        const { data, status } = await request
        if (status === 200) {
            storeToken(data)
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