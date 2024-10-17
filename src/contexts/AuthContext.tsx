import {createContext, ReactNode, useContext, useEffect, useState} from "react";
import {toast} from "sonner";
import {TOAST_CUSTOM_CLOSE_BTN} from "../common/toast-custom-close-btn.tsx";
import {IS_AUTHENTICATED_KEY} from "../common/CommonConst.ts";
import AuthContextProps from "../component-props/auth-context-props.ts";
import IamService from "../service/iam-service.ts";
import UserAccount from "../dto/UserAccount.ts";
import axios, {AxiosResponse} from "axios";

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export function AuthProvider({ children }: {children: ReactNode}) {
    const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem(IS_AUTHENTICATED_KEY) !== null);
    const [currentUser, setCurrentUser] = useState<UserAccount | null>(null);

    useEffect(() => {
        const controller = new AbortController();
        (async () => {
            if(isAuthenticated) {
                try {
                    const response: AxiosResponse<UserAccount, any> = await axios.get('/user/details', {
                        withCredentials: true,
                        timeout: 2000,
                        timeoutErrorMessage: "Failed to get user details",
                        signal: controller.signal,
                    });

                    const userDetails: UserAccount = response.data;
                    setCurrentUser(userDetails);
                } catch (error: any) {
                    // do nothing
                }
            }
        })();
        return () => controller.abort();

    }, [isAuthenticated])

    const loginUser = () => {
        localStorage.setItem(IS_AUTHENTICATED_KEY, "true");

        setIsAuthenticated(true);
    };

    const logoutUser = async () => {
        try {
            const logoutMessage: string = await IamService.logout();

            localStorage.removeItem(IS_AUTHENTICATED_KEY);
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