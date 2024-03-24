import { IProject } from "interfaces/project";
import { handleAxiosError } from "@/utils/handleError";
import axios from "axios";

export const analyzeUrl = async (url: string): Promise<any> => {
    try {
        const response = await axios.post('http://localhost:3000/api/analyze', {
            url
        })
        return response.data
    } catch (error) {
        handleAxiosError(error)
        throw error
    }
}