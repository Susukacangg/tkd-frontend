import Header from "../components/Header.tsx";
import LoginForm from "../components/LoginForm.tsx";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {setAppFunctions} from "../common/api-client.ts";

function Login() {
    const navigate = useNavigate();

    useEffect(() => {
        setAppFunctions(navigateToLogin);
    }, [])

    const navigateToLogin = () => navigate("/login");

    return(
        <>
            <Header enableContributeBtn={false} enableSearchBar={false} enableAvatar={false} enableHomeOnly={true}/>
            <LoginForm/>
        </>
    );
}

export default Login;