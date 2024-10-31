import Header from "../components/Header.tsx";
import {Typography} from "@mui/material";
import CenteredContainer from "../components/CenteredContainer.tsx";

function NotFoundPage() {
    return (
        <>
            <Header enableHomeOnly={true} enableContributeBtn={false} enableSearchBar={false} enableAvatar={false}/>
            <CenteredContainer>
                <Typography variant={"h1"}
                            color={"primary"}>
                    404 NOT FOUND
                </Typography>
                <Typography variant={"h3"}>
                    We're sorry, the requested page is not available
                </Typography>
            </CenteredContainer>
        </>
    );
}

export default NotFoundPage;
