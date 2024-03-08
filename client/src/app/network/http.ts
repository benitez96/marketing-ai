
import axios, { AxiosInstance, AxiosResponse, Canceler } from 'axios';

interface IRequest{
    request: Promise<AxiosResponse<any, any>>
    cancel: Canceler
}

class HttpService {
    protected baseUrl: string
    protected instance: AxiosInstance


    constructor(baseURL = 'https://api.yourdomain.com') {
        this.baseUrl = baseURL;
        this.instance = axios.create({ baseURL: this.baseUrl });
    }

    get defaultHeaders() {
        return {
            // 'Authorization': localStorage.getItem('Authorization'),
            'Content-Type': 'application/json',
        };
    }

    async request(method: string, url: string, data: any, customHeaders = {}) {
        const headers = { ...this.defaultHeaders, ...customHeaders };
        const source = axios.CancelToken.source();

        const config = {
            method,
            url,
            headers,
            data,
            cancelToken: source.token
        };

        if (data) {
            config.data = data;
        }

        return {
            request: this.instance(config),
            cancel: source.cancel
        };
    }

    get(url: string, customHeaders = {}) {
        return this.request('get', url, null, customHeaders);
    }

    post<T>(url: string, data: T, customHeaders = {}): Promise<IRequest> {
        return this.request('post', url, data, customHeaders);
    }

    put<T>(url: string, data: T, customHeaders = {}) {
        return this.request('put', url, data, customHeaders);
    }

    delete(url: string, customHeaders = {}) {
        return this.request('delete', url, null, customHeaders);
    }
}

export default HttpService