import {Typography} from "@mui/material";
import Navbar from "./Navbar.tsx";
import HeaderProps from "../component-props/header-props.ts";
import {useNavigate} from "react-router-dom";

const HeaderTitle = () => {
    const navigate = useNavigate();

    return (
        <Typography variant="h5" className={"font-semibold xl:mr-14 sm:mr-0 sm:text-5xl xl:text-2xl sm:py-10 xl:py-0 text-nowrap"}
                    onClick={() => navigate("/home")}>
            The Kadazandusun Dictionary
        </Typography>
    );
}

function Header({enableHomeOnly = false, enableAvatar = true, enableSearchBar = true, enableContributeBtn = true}: HeaderProps) {

    return (
        <header className={"bg-white static top-0 z-50 flex justify-center items-center px-8 border-0 border-b-2 border-solid border-b-gray-200"}>
        {/*items center kasi center the text in the middle line*/}
            <HeaderTitle/>
            <Navbar enableHomeOnly={enableHomeOnly}
                    enableContributeBtn={enableContributeBtn}
                    enableSearchBar={enableSearchBar}
                    enableAvatar={enableAvatar}/>
        </header>
    );
}

export default Header;