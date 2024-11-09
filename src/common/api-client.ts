import axios from "axios";
import {IS_AUTHENTICATED_KEY} from "./constants.ts";
import IamService from "../service/iam-service.ts";

export const iamClient = axios.create({
    baseURL: "https://api.iam.thekadazandusundictionary.com/api"
})

export const dictionaryClient = axios.create({
    baseURL: "https://api.dictionary.thekadazandusundictionary.com/api"
})

const protectedRoutes = ["/contribute"];
const isProtectedRoute = (path: string) => protectedRoutes.includes(path);

let updateTokenRefreshed: (value: boolean) => void;
export const setAuthContextFunctions = (updateToken: (value: boolean) => void) => {
    updateTokenRefreshed = updateToken;
}

const handleResponseErrorInterceptor = async (error: any) => {
    const originalRequest = error.config

    if(error.status === 403 && !originalRequest._retry) {
        originalRequest._retry = true;
        try {
            await IamService.refresh();
            if(updateTokenRefreshed)
                updateTokenRefreshed(true);
            return axios(originalRequest);
        } catch (error) {
            // do nothing
        }
    } else if (error.status === 401 && error.response.data === "Refresh token error") {
        localStorage.removeItem(IS_AUTHENTICATED_KEY);
        if(isProtectedRoute(window.location.pathname))
            window.location.href = "/login";
        else
            window.location.reload();
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
