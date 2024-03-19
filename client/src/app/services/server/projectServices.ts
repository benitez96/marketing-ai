import { IProject } from "interfaces/project";
import { handleAxiosError } from "@/utils/handleError";
import HttpService from "network/http";

export const getProjects = async (): Promise<IProject[]> => {
    try {
        const { request } = new HttpService().get<IProject[]>(`chats/`)
        return (await request).data
    } catch (error) {
        handleAxiosError(error)
        throw error
    }
}

export const getProjectById = async (id: string) => {
    try {
        const { request } = new HttpService().get<IProject>(`chats/${id}`)
        return (await request).data
    } catch (error) {
        handleAxiosError(error)
        throw error
    }
}