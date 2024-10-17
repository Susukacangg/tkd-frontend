import UserAccount from "../dto/UserAccount.ts";

export default interface AuthContextProps {
    currentUser: UserAccount | null;
    isAuthenticated: boolean;
    loginUser: () => void;
    logoutUser: () => void;
}