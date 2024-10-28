import Header from "../components/Header.tsx";
import ContributionForm from "../components/ContributionForm.tsx";

function Contribute() {
    return (
        <>
            <Header enableContributeBtn={false}/>
            <ContributionForm/>
        </>
    );
}

export default Contribute;