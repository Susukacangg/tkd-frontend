import Header from "../components/Header.tsx";
import RegisForm from "../components/RegisForm.tsx";
import Navbar from "../components/Navbar.tsx";

function Register() {
    return (
        <>
            <Header>
                <Navbar enableHomeOnly={true} enableContributeBtn={false}
                        enableSearchBar={false} enableAvatar={false}/>
            </Header>
            <RegisForm/>
        </>
    );
}

export default Register