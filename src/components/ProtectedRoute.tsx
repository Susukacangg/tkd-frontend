import {useAuth} from "../contexts/AuthContext.tsx";
import {Navigate} from "react-router-dom";
import {JSX} from "react";
import LoadingPage from "../pages/LoadingPage.tsx";

function ProtectedRoute({children}: {children: JSX.Element}) {
    const {isAuthenticated, isAuthenticating} = useAuth();

    if (isAuthenticating)
        return <LoadingPage loadingText={"Verifying user"}/>

    return isAuthenticated ? children : <Navigate to={"/login"}/>;
}

export default ProtectedRoute;