
import { handleAxiosError } from "@/utils/handleError";
import HttpService from "network/http";
import { IFormInput } from "interfaces/form";

export const getForm = async (): Promise<IFormInput[]> => {
    try {
        const { request } = new HttpService().get<IFormInput[]>(`forms/free`)
        return (await request).data
    } catch (error) {
        handleAxiosError(error)
        throw error
    }
}