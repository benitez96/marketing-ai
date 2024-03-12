import axios from "axios";
import { cookies } from 'next/headers'

import { TOKEN_NAME } from "@/utils/const";
import { IProject } from "interfaces/project";
import { handleAxiosError } from "@/utils/handleError";

export const getProjects = async (): Promise<IProject[]> => {
    try {
        const response = await axios.get<IProject[]>('http://localhost:8000/api/chats', {
            headers: { Authorization: `Bearer ${cookies().get(TOKEN_NAME)?.value}` }
        })
        return response.data
    } catch (error) {
        handleAxiosError(error)
        throw error
    }
}