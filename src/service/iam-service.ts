import axios, {AxiosResponse} from "axios";
import RegisterRequest from "../dto/RegisterRequest.ts";
import LoginRequest from "../dto/LoginRequest.ts";
import UserAccount from "../dto/UserAccount.ts";

class IamService {

    static async register(req: RegisterRequest): Promise<string> {
        try {
            const response = await axios.post('/auth/register', req, {
                timeout: 3000,
                timeoutErrorMessage: "Failed to register"
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    static async login(req: LoginRequest): Promise<string> {
        try {
            const response = await axios.post('/auth/login', req, {
                timeout: 3000,
                timeoutErrorMessage: "Failed to login"
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    static async logout(): Promise<string> {
        try {
            const response = await axios.post('/auth/logout', {
                timeout: 3000,
                timeoutErrorMessage: "Something went wrong",
            })
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    static async refresh(): Promise<string> {
        try {
            const response = await axios.post('/auth/refresh', {}, {
                withCredentials: true,
                timeout: 1100,
                timeoutErrorMessage: "Failed to refresh token",
            })
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    static async checkUsername(username: string): Promise<boolean> {
        try {
            const response = await axios.get('/auth/check-username', {
                params: {username: username},
                timeout: 1100,
                timeoutErrorMessage: "Failed to check username"
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    static async checkEmail(email: string): Promise<boolean> {
        try {
            const response = await axios.get('/auth/check-email', {
                params: {email: email},
                timeout: 1100,
                timeoutErrorMessage: "Failed to check email"
            });

            return response.data;
        } catch (error) {
            throw error;
        }
    }

    static async getUserDetails(controller: AbortController): Promise<UserAccount> {
        try {
            const response: AxiosResponse<UserAccount, any> = await axios.get('/user/details', {
                withCredentials: true,
                timeout: 2000,
                timeoutErrorMessage: "Failed to get user details",
                signal: controller.signal,
            });

            return response.data;
        } catch (error: any) {
            // do nothing
            throw error;
        }
    }

}

export default IamService;