import Header from "../components/common/Header.tsx";
import RegisForm from "../components/auth/RegisForm.tsx";

function Register() {
    return (
        <>
            <Header enableContributeBtn={false} enableSearchBar={false} enableAvatar={false} enableHomeOnly={true}/>
            <RegisForm/>
        </>
    );
}

export default Register