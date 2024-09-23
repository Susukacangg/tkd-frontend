import Header from "../components/Header.tsx";
import LoginForm from "../components/LoginForm.tsx";

function Login() {
    return(
        <>
            <Header enableContributeBtn={false} enableSearchBar={false} enableAvatar={false} enableHomeOnly={true}/>
            <LoginForm/>
        </>
    );
}

export default Login;