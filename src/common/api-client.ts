import axios, {AxiosError, AxiosRequestConfig} from "axios";
import IamService from "../service/iam-service.ts";
import Cookies from "js-cookie";
import {toast} from "sonner";
import {TOAST_CUSTOM_CLOSE_BTN} from "./toast-custom-close-btn.tsx";

interface CustomAxiosRequestConfig extends AxiosRequestConfig {
    _retry?: boolean;
}

export const iamClient = axios.create({
    baseURL: "http://localhost:8081/api"
})

export const dictionaryClient = axios.create({
    baseURL: "http://localhost:8082/api"
})

let updateTokenRefreshed: (value: boolean) => void;
let logoutUser: () => void;
let navigateToLogin: () => void;
export const setAuthContextFunctions = (
    updateToken: (value: boolean) => void,
    logoutUserFunction: () => void,
) => {
    updateTokenRefreshed = updateToken;
    logoutUser = logoutUserFunction;
}
export const setAppFunctions = (navigateToLoginFunction: () => void) => {
    navigateToLogin = navigateToLoginFunction;
}

const handleResponseErrorInterceptor = async (error: AxiosError) => {
    const originalRequest = error.config as CustomAxiosRequestConfig;

    if(error.status === 403 && !originalRequest._retry) {
        originalRequest._retry = true;
        try {
            await IamService.refresh();
            if(updateTokenRefreshed)
                updateTokenRefreshed(true);
            // @ts-ignore
            originalRequest.headers['X-XSRF-TOKEN'] = Cookies.get("XSRF-TOKEN");
            return axios(originalRequest);
        } catch (error) {
            // do nothing
        }
    } else if (error.status === 401 && error.response?.data === "Refresh token error") {
        toast.info("Your session has expired, please login again", TOAST_CUSTOM_CLOSE_BTN);
        logoutUser();
        navigateToLogin();
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
