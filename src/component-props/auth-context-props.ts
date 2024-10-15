import LoginResponse from "../dto/LoginResponse.ts";
import UserAccount from "../dto/UserAccount.ts";

export default interface AuthContextProps {
    currentUser: UserAccount | null;
    isAuthenticated: boolean;
    loginUser: (res: LoginResponse) => void;
    logoutUser: () => void;
}