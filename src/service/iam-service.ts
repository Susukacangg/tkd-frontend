import {AxiosResponse} from "axios";
import RegisterRequest from "../dto/RegisterRequest.ts";
import LoginRequest from "../dto/LoginRequest.ts";
import UserView from "../dto/UserView.ts";
import {iamClient} from "../common/api-client.ts";

class IamService {

    static async register(req: RegisterRequest): Promise<string> {
        try {
            const response = await iamClient.post('/auth/register', req, {
                withCredentials: true,
                timeoutErrorMessage: "Failed to register"
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    static async login(req: LoginRequest): Promise<string> {
        try {
            const response = await iamClient.post('/auth/login', req, {
                withCredentials: true,
                timeoutErrorMessage: "Failed to login"
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    static async logout(controller: AbortController): Promise<string> {
        try {
            const response = await iamClient.post('/auth/logout', {
                withCredentials: true,
                timeoutErrorMessage: "Something went wrong",
                signal: controller.signal
            })
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    static async refresh(): Promise<string> {
        try {
            const response = await iamClient.post('/auth/refresh', {}, {
                withCredentials: true,
                timeoutErrorMessage: "Failed to refresh token",
            })
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    static async checkUsername(username: string): Promise<boolean> {
        try {
            const response = await iamClient.get('/auth/check-username', {
                params: {username: username},
                timeoutErrorMessage: "Failed to check username"
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    static async checkEmail(email: string): Promise<boolean> {
        try {
            const response = await iamClient.get('/auth/check-email', {
                params: {email: email},
                timeoutErrorMessage: "Failed to check email"
            });

            return response.data;
        } catch (error) {
            throw error;
        }
    }

    static async getUserDetails(controller: AbortController): Promise<UserView> {
        try {
            const response: AxiosResponse<UserView, any> = await iamClient.get('/user/details', {
                params: {includeId: false},
                withCredentials: true,
                timeoutErrorMessage: "Failed to get user details",
                signal: controller.signal,
            });

            return response.data;
        } catch (error: any) {
            // do nothing
            throw error;
        }
    }

    static async checkAdmin(controller: AbortController): Promise<boolean> {
        try {
            const response = await iamClient.get('/admin/check', {
                withCredentials: true,
                signal: controller.signal,
            });

            return response.data;
        } catch (error: any) {
            throw error;
        }
    }

}

export default IamService;