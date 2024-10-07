import Header from "../components/common/Header.tsx";
import LoginForm from "../components/auth/LoginForm.tsx";

function Login() {
    return(
        <>
            <Header enableContributeBtn={false} enableSearchBar={false} enableAvatar={false} enableHomeOnly={true}/>
            <LoginForm/>
        </>
    );
}

export default Login;