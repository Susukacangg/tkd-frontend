import {createContext, ReactNode, useContext, useEffect, useState} from "react";
import {IS_AUTHENTICATED_KEY} from "../common/constants.ts";
import AuthContextProps from "../component-props/auth-context-props.ts";
import IamService from "../service/iam-service.ts";
import UserView from "../dto/UserView.ts";

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export function AuthProvider({ children }: {children: ReactNode}) {
    const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem(IS_AUTHENTICATED_KEY) !== null);
    const [currentUser, setCurrentUser] = useState<UserView | null>(null);
    const [isUserAdmin, setIsUserAdmin] = useState(false);

    useEffect(() => {
        const controller = new AbortController();

        (async () => {
            try {
                const response: UserView | null = await IamService.getUserDetails(controller);
                setCurrentUser(response ? response : null);
            } catch (error: any) {
                if(controller.signal.aborted)
                    return;
                console.error(error.message);
            }
        })();

        return () => controller.abort();
    }, [isAuthenticated])

    useEffect(() => {
        const controller = new AbortController();

        (async () => {
            try {
                const response: boolean = await IamService.checkAdmin(controller);
                setIsUserAdmin(response);
            } catch (error: any) {
                if(controller.signal.aborted)
                    return;
                console.error(error.message);
            }
        })();

        return () => controller.abort();
    }, [isAuthenticated])

    const loginUser = () => {
        localStorage.setItem(IS_AUTHENTICATED_KEY, "true");

        setIsAuthenticated(true);
    };

    const logoutUser = () => {
        localStorage.removeItem(IS_AUTHENTICATED_KEY);

        setIsAuthenticated(false);
    };

    return(
        <AuthContext.Provider value={{currentUser, isAuthenticated, isUserAdmin, loginUser, logoutUser}}>
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