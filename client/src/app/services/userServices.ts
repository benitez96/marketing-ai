import { request } from '@/utils/axios'

export const login = async (user: any) => {
    const form = new FormData();
    form.append('username', user.username);
    form.append('password', user.password);
    return await request.post<any>('/users/signin', form)
}