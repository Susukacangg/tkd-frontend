import axios from "axios";
import RegisterRequest from "../dto/RegisterRequest.ts";
import LoginRequest from "../dto/LoginRequest.ts";

class IamService {

    static async register(req: RegisterRequest) {
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

    static async login(req: LoginRequest) {
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

}

export default IamService;