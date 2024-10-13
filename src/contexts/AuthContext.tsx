import {createContext, ReactNode, useContext, useState} from "react";
import {toast} from "sonner";
import {TOAST_CUSTOM_CLOSE_BTN} from "../common/toast-custom-close-btn.tsx";
import {CURRENT_USERNAME_KEY, JWT_TOKEN_KEY} from "../common/CommonConst.ts";
import LoginResponse from "../dto/LoginResponse.ts";
import AuthContextProps from "../component-props/auth-context-props.ts";
import IamService from "../service/iam-service.ts";

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export function AuthProvider({ children }: {children: ReactNode}) {
    const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem(JWT_TOKEN_KEY) !== null);
    const [currentUsername, setCurrentUsename] = useState<string | null>(localStorage.getItem(CURRENT_USERNAME_KEY));

    const loginUser = (response: LoginResponse) => {
        localStorage.setItem(CURRENT_USERNAME_KEY, response.username);
        localStorage.setItem(JWT_TOKEN_KEY, response.token)

        setIsAuthenticated(true);
        setCurrentUsename(response.username);
    };

    const logoutUser = async () => {
        try {
            const logoutMessage = await IamService.logout();

            localStorage.removeItem(CURRENT_USERNAME_KEY);
            localStorage.removeItem(JWT_TOKEN_KEY);
            toast.success(logoutMessage, TOAST_CUSTOM_CLOSE_BTN);

            setIsAuthenticated(false);
            setCurrentUsename(null);
        } catch (error: any) {
            toast.error(error.message, TOAST_CUSTOM_CLOSE_BTN);
        }
    };

    return(
        <AuthContext.Provider value={{isAuthenticated, currentUsername, loginUser, logoutUser}}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if(context === undefined)
        throw new Error("useAuth must be used within the AuthProvider");
    return context;
}