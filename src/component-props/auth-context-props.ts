import UserView from "../dto/UserView.ts";

export default interface AuthContextProps {
    currentUser: UserView | null;
    isAuthenticated: boolean;
    isUserAdmin: boolean;
    isLoadingUser: boolean;
    isAuthenticating: boolean;
    updateIsTokenRefreshed: (value: boolean) => void;
    loginUser: () => void;
    logoutUser: () => void;
}