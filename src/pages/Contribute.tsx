import Header from "../components/common/Header.tsx";
import ContributionForm from "../components/contribute/ContributionForm.tsx";

function Contribute() {
    return (
        <>
            <Header enableContributeBtn={true}/>
            <ContributionForm/>
        </>
    );
}

export default Contribute;