import axios from "axios";

export const request = axios.create({
    baseURL: 'http://localhost:8000/api/',
})


// if (typeof window !== "undefined") {
//     const token = localStorage.getItem('token')
//     if (token) {
//         axios.interceptors.request.use(
//             config => {
//                 config.headers['Authorization'] = `Bearer ${token}`
//                 return config
//             },
//         )
//     }
// }

axios.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401 && window.location.pathname !== '/login') {
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);
