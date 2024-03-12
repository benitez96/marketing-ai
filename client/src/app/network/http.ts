
import axios, { AxiosInstance, AxiosResponse, CancelToken, CancelTokenSource, Canceler } from 'axios';
import { cookies } from 'next/headers';

interface IRequest {
    request: Promise<AxiosResponse<any, any>>
    cancel: Canceler
}

interface IConfig {
    method: string
    url: string
    headers: any
    cancelToken: CancelToken
    data?: any
}

class HttpService {
    protected baseUrl: string
    protected instance: AxiosInstance

    constructor(baseURL = 'http://localhost:8000/api/') {
        this.baseUrl = baseURL;
        this.instance = axios.create({ baseURL: this.baseUrl });
    }

    get defaultHeaders() {
        return {
            // 'Authorization': localStorage.getItem('Authorization'),
            'Content-Type': 'application/json',
        };
    }

    request(method: string, url: string, data: any = null, customHeaders = {}) {
        const headers = { ...this.defaultHeaders, ...customHeaders };
        const source = axios.CancelToken.source();

        const config: IConfig = {
            method,
            url,
            headers,
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

    post<T>(url: string, data: T, customHeaders = {}): IRequest {
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