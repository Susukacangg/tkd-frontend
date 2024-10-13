import LoginResponse from "../dto/LoginResponse.ts";

export default interface AuthContextProps {
    isAuthenticated: boolean;
    currentUsername: string | null;
    loginUser: (res: LoginResponse) => void;
    logoutUser: () => void;
}