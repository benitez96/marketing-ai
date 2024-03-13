import { getToken } from "@/actions/auth";
import axios from "axios";

export const request = axios.create({
    baseURL: 'http://localhost:8000/api/',
})

request.interceptors.request.use(async (config) => {
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
