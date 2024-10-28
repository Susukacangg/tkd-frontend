import UserView from "../dto/UserView.ts";

export default interface AuthContextProps {
    currentUser: UserView | null;
    isAuthenticated: boolean;
    loginUser: () => void;
    logoutUser: () => Promise<void>;
}