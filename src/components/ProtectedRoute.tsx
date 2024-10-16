import {useAuth} from "../contexts/AuthContext.tsx";
import {Navigate} from "react-router-dom";
import {JSX} from "react";

function ProtectedRoute({children}: {children: JSX.Element}) {
    const {isAuthenticated} = useAuth();

    if(!isAuthenticated)
        return children;
    else
        return <Navigate to={"/login"}/>
}

export default ProtectedRoute;