import Header from "../components/Header.tsx";
import Navbar from "../components/Navbar.tsx";
import {useParams} from "react-router-dom";

function Definition() {

    const params = useParams();

    return(
        <>
            <Header>
                <Navbar enableContributeBtn={false}/>
            </Header>
            {params.wordId}
        </>
    );
}

export default Definition;