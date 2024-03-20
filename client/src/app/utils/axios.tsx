import { deleteToken, getToken } from "@/actions/auth";
import axios from "axios";
import { redirect } from "next/navigation";

export const api = axios.create({
    baseURL: 'http://localhost:8000/api/',
})

api.interceptors.request.use(async (config) => {
    const token = await getToken()
    if (token !== undefined) {
        config.headers!['Authorization'] = "Bearer " + token?.value
    }
    return config
},
    (error) => {
        console.log(error)
        return Promise.reject(error)
    }
)

api.interceptors.response.use(
    response => {
        return response;
    },
    async (error) => {
        console.log('=====>', error)
        // Handle errors globally
        if (error.response && error.response.status === 401) {
            // await deleteToken()
            // Redirect to login page if user is not authenticated

        }
        return Promise.reject(error);
    }
);
