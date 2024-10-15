import {createContext, ReactNode, useContext, useEffect, useState} from "react";
import {toast} from "sonner";
import {TOAST_CUSTOM_CLOSE_BTN} from "../common/toast-custom-close-btn.tsx";
import {IS_AUTHENTICATED_KEY, JWT_TOKEN_KEY} from "../common/CommonConst.ts";
import LoginResponse from "../dto/LoginResponse.ts";
import AuthContextProps from "../component-props/auth-context-props.ts";
import IamService from "../service/iam-service.ts";
import UserAccount from "../dto/UserAccount.ts";

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export function AuthProvider({ children }: {children: ReactNode}) {
    const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem(IS_AUTHENTICATED_KEY) !== null);
    const [currentUser, setCurrentUser] = useState<UserAccount | null>(null);

    useEffect(() => {
        (async () => {
            if(isAuthenticated) {
                try {
                    console.log("load user details");
                    const userDetails = await IamService.getUserDetails();
                    setCurrentUser(userDetails);
                } catch (error: any) {
                    console.error(error);
                }
            }
        })();
    }, [isAuthenticated])

    const loginUser = (response: LoginResponse) => {
        localStorage.setItem(IS_AUTHENTICATED_KEY, "true");
        sessionStorage.setItem(JWT_TOKEN_KEY, response.token)

        setIsAuthenticated(true);
    };

    const logoutUser = async () => {
        try {
            const logoutMessage = await IamService.logout();

            localStorage.removeItem(IS_AUTHENTICATED_KEY);
            sessionStorage.removeItem(JWT_TOKEN_KEY);
            toast.success(logoutMessage, TOAST_CUSTOM_CLOSE_BTN);

            setIsAuthenticated(false);

            window.location.href = "/login"
        } catch (error: any) {
            toast.error(error.message, TOAST_CUSTOM_CLOSE_BTN);
        }
    };

    return(
        <AuthContext.Provider value={{currentUser, isAuthenticated, loginUser, logoutUser}}>
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