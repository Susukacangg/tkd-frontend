import Header from "../components/Header.tsx";
import ContributionForm from "../components/ContributionForm.tsx";

function Contribute() {
    return (
        <>
            <Header enableContributeBtn={true}/>
            <ContributionForm/>
        </>
    );
}

export default Contribute;