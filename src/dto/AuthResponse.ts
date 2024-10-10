export default interface AuthResponse {
    token: string;
    refreshToken: string;
    responseInfo: {
        message: string;
        errorCode: number;
    }
}