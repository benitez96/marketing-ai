import axios from "axios";

import { handleAxiosError } from "@/utils/handleError";
import { IFormAnalyzeWebsite } from "interfaces/form";

export const analyzeUrl = async (url: string): Promise<IFormAnalyzeWebsite> => {
    try {
        const response = await axios.post<IFormAnalyzeWebsite>('http://localhost:3000/api/analyze', {
            url
        })
        return response.data
    } catch (error) {
        handleAxiosError(error)
        throw error
    }
}