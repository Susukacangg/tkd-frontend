import Header from "../components/Header.tsx";
import Navbar from "../components/Navbar.tsx";
import ContributionForm from "../components/ContributionForm.tsx";

function Contribute() {
    return (
        <>
            <Header>
                <Navbar enableContributeBtn={false}/>
            </Header>
            <ContributionForm/>
        </>
    );
}

export default Contribute;