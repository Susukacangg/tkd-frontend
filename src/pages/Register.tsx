import Header from "../components/Header.tsx";
import RegisForm from "../components/RegisForm.tsx";

function Register() {
    return (
        <>
            <Header enableContributeBtn={false} enableSearchBar={false} enableAvatar={false} enableHomeOnly={true}/>
            <RegisForm/>
        </>
    );
}

export default Register