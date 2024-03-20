
import { handleAxiosError } from "@/utils/handleError";
import HttpService from "network/http";

export const getUser = async (): Promise<any> => {
    try {
        const { request } = new HttpService().get<any>(`users/me`)
        return (await request).data
    } catch (error) {
        handleAxiosError(error)
        throw error
    }
}