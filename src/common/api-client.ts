import axios from "axios";
import {IS_AUTHENTICATED_KEY} from "./constants.ts";
import IamService from "../service/iam-service.ts";

export const iamClient = axios.create({
    baseURL: "http://localhost:8081/api"
})

export const dictionaryClient = axios.create({
    baseURL: "http://localhost:8082/api"
})

const handleResponseErrorInterceptor = async (error: any) => {
    const originalRequest = error.config

    if(error.status === 403 && !originalRequest._retry) {
        originalRequest._retry = true;
        try {
            await IamService.refresh();
            return axios(originalRequest);
        } catch (error) {
            // do nothing
        }
    } else if (error.status === 500 && error.response.data.message === "Refresh token error") {
        localStorage.removeItem(IS_AUTHENTICATED_KEY);
        window.location.href = "/login";
    }

    return Promise.reject(error);
}

iamClient.interceptors.response.use(
    (response) => response,
    handleResponseErrorInterceptor
);

dictionaryClient.interceptors.response.use(
    (response) => response,
    handleResponseErrorInterceptor
);
