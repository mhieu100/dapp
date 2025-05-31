import axiosClient from 'axios';
import { notification } from 'antd';

import { store } from '../redux/store';

/**
 * Creates an initial 'axios' instance with custom settings.
 */

const instance = axiosClient.create({
    baseURL: 'http://localhost:8080',
    withCredentials: true
});

const NO_RETRY_HEADER = 'x-no-retry';



instance.interceptors.request.use(function (config) {
    
    if (!config.headers.Accept && config.headers['Content-Type']) {
        config.headers.Accept = 'application/json';
        config.headers['Content-Type'] = 'application/json; charset=utf-8';
    }
    return config;
});

/**
 * Handle all responses. It is possible to add handlers
 * for requests, but it is omitted here for brevity.
 */
instance.interceptors.response.use(
    (res) => res.data,
    async (error) => {
        if (error.config && error.response
            && +error.response.status === 401
            && error.config.url !== '/auth/login'
            && !error.config.headers[NO_RETRY_HEADER]
        ) {
            error.config.headers[NO_RETRY_HEADER] = 'true';
            
        }

        if (+error.response.status === 403) {
            notification.error({
                message: error?.response?.data?.message ?? '',
                description: error?.response?.data?.error ?? ''
            });
        }

        return error?.response?.data ?? Promise.reject(error);
    }
);

/**
 * Replaces main `axios` instance with the custom-one.
 * @param cfg - Axios configuration object.
 * @returns A promise object of a response of the HTTP request with the 'data' object already
 * destructured.
 */
export default instance;
