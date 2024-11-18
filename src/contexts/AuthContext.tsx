import {createContext, ReactNode, useContext, useEffect, useState} from "react";
import AuthContextProps from "../component-props/auth-context-props.ts";
import IamService from "../service/iam-service.ts";
import UserView from "../dto/UserView.ts";

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export function AuthProvider({ children }: {children: ReactNode}) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [currentUser, setCurrentUser] = useState<UserView | null>(null);
    const [isUserAdmin, setIsUserAdmin] = useState(false);
    const [isTokenRefreshed, setIsTokenRefreshed] = useState(false);
    const [isLoadingUser, setIsLoadingUser] = useState(true);
    const [isAuthenticating, setIsAuthenticating] = useState(true);

    useEffect(() => {
        const controller = new AbortController();

        getCsrfToken(controller);

        const interval = setInterval(() => getCsrfToken(), 840000)

        return () => {
            controller.abort();
            clearInterval(interval);
        }
    }, [])

    useEffect(() => {
        const controller = new AbortController();

        (async () => {
            try {
                setIsAuthenticated(await IamService.checkIsUserAuthenticated(controller));
                setIsAuthenticating(false);
            } catch (error: any) {
                if (controller.signal.aborted)
                    return;
                console.error(error);
                setIsAuthenticated(false);
                setIsAuthenticating(false);
            }
        })();

        return () => controller.abort();
    }, [])

    useEffect(() => {
        const controller = new AbortController();

        (async () => {
            if(isAuthenticated) {
                try {
                    const response: UserView | undefined = await IamService.getUserDetails(controller);
                    setCurrentUser(!response ? null : response);
                    setIsLoadingUser(false);
                    setIsTokenRefreshed(false);
                } catch (error: any) {
                    if (controller.signal.aborted)
                        return;
                    console.error(error.message);
                    setIsLoadingUser(false);
                }
            } else {
                setCurrentUser(null);
                setIsLoadingUser(false);
            }
        })();

        return () => controller.abort();
    }, [isAuthenticated, isTokenRefreshed])

    useEffect(() => {
        const controller = new AbortController();

        (async () => {
            if(isAuthenticated) {
                try {
                    const response: boolean = await IamService.checkAdmin(controller);
                    setIsUserAdmin(response);
                    setIsTokenRefreshed(false);
                } catch (error: any) {
                    if (controller.signal.aborted)
                        return;
                    console.error(error.message);
                }
            } else {
                setIsUserAdmin(false);
            }
        })();

        return () => controller.abort();
    }, [isAuthenticated, isTokenRefreshed])

    const loginUser = () => {
        setIsAuthenticated(true);
    };

    const logoutUser = () => {
        setIsAuthenticated(false);
    };

    const updateIsTokenRefreshed = (value: boolean) => setIsTokenRefreshed(value);

    const getCsrfToken = async (controller?: AbortController) => {
        try {
            await IamService.getCsrfToken(controller);
        } catch (error: any) {
            if (controller?.signal.aborted)
                return;
            console.error(error);
        }
    }

    return(
        <AuthContext.Provider value={{currentUser, isAuthenticated, isUserAdmin, isLoadingUser, isAuthenticating, updateIsTokenRefreshed, loginUser, logoutUser}}>
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