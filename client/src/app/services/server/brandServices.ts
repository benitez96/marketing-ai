
import { handleAxiosError } from "@/utils/handleError";
import HttpService from "network/http";

export const getBrands = async (): Promise<any> => {
    try {
        const { request } = new HttpService().get<any>(`brands/`)
        return (await request).data
    } catch (error) {
        handleAxiosError(error)
        throw error
    }
}


// export const createBrand = async (data: any): Promise<any> => {
//     try {
//         const { request } = new HttpService().post<any>(`brands/`, data)
//         return (await request).data
//     } catch (error) {
//         handleAxiosError(error)
//         throw error
//     }
// }