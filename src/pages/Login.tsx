import Header from "../components/Header.tsx";
import Navbar from "../components/Navbar.tsx";
import LoginForm from "../components/LoginForm.tsx";

function Login() {
    return(
        <>
            <Header>
                <Navbar enableHomeOnly={true} enableContributeBtn={false}
                        enableSearchBar={false} enableAvatar={false}/>
            </Header>
            <LoginForm/>
        </>
    );
}

export default Login;