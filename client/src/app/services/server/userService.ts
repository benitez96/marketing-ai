
import { handleAxiosError } from "@/utils/handleError";
import { isAxiosError } from "axios";
import HttpService from "network/http";
import { cache } from "react";

export const getUser = async (): Promise<any> => {
    try {
        const { request } = new HttpService().get<any>(`users/me`)
        const user = (await request).data
        return user
    } catch (error) {
        if (isAxiosError(error)) {
            if (error.response?.status === 401) {
                return null
            }
        }
        return null
    }
}


export const getUserCached = cache(async (): Promise<any> => {
    try {
        const { request } = new HttpService().get<any>(`users/me`)
        const user = (await request).data
        return user
    } catch (error) {
        if (isAxiosError(error)) {
            if (error.response?.status === 401) {
                return null
            }
        }
        return null
    }
});