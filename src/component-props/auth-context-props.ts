import UserView from "../dto/UserView.ts";

export default interface AuthContextProps {
    currentUser: UserView | null;
    isAuthenticated: boolean;
    isUserAdmin: boolean;
    loginUser: () => void;
    logoutUser: () => void;
}