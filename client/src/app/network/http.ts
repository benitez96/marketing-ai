
import { TOKEN_NAME } from '@/utils/const';
import axios, { AxiosInstance, AxiosResponse, CancelToken, CancelTokenSource, Canceler } from 'axios';
import { cookies } from 'next/headers';

interface IRequest<T> {
    request: Promise<AxiosResponse<T, any>>
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
        const header: any = {
            'Content-Type': 'application/json',
        }
        const token = cookies().get(TOKEN_NAME)
        if (token !== undefined) {
            header['Authorization'] = `Bearer ${token.value}`
        }
        return header;
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

    get<T>(url: string): IRequest<T> {
        return this.request('get', url, null);
    }

    post<T>(url: string, data: T, customHeaders = {}): IRequest<T> {
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