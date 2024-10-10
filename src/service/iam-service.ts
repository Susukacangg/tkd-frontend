import axios from "axios";
import RegisterRequest from "../dto/RegisterRequest.ts";

class IamService {
    private static BASE_URL: string = "http://localhost:8081/api/auth";

    static async register(req: RegisterRequest) {
        try {
            const response = await axios.post('/register', req, {
                baseURL: IamService.BASE_URL,
                timeout: 5000,
                timeoutErrorMessage: "Failed to register"
            });
            return response.data
        } catch (error) {
            throw error;
        }
    }

    static async checkUsername(username: string): Promise<boolean> {
        try {
            const response = await axios.get('check-username', {
                params: {username: username},
                baseURL: IamService.BASE_URL,
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
            const response = await axios.get('check-email', {
                params: {email: email},
                baseURL: IamService.BASE_URL,
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