import {Typography} from "@mui/material";
import Navbar from "./Navbar.tsx";
import NavBarProps from "../component-props/nav-bar-props.ts";
import {HeaderContext} from "../contexts/HeaderContext.ts";

const HeaderTitle = () => {
    return (
        <Typography variant="h5" className={"font-semibold mr-14 text-nowrap"}>The Kadazandusun Dictionary</Typography>
    );
}

function Header({enableHomeOnly = false, enableAvatar = true, enableSearchBar = true, enableContributeBtn = true}: NavBarProps) {

    return (
        <HeaderContext.Provider value={{
            userName: "Zachary Jobb Jude Abel Logijin",
            enableHomeOnly,
            enableAvatar,
            enableSearchBar,
            enableContributeBtn
        }}>
            {/*items center kasi center the text in the middle line*/}
            <header className={"bg-white static top-0 z-50 flex items-center px-8 border-0 border-b-2 border-solid border-b-gray-200"}>
                <HeaderTitle/>
                <Navbar/>
            </header>
        </HeaderContext.Provider>
    );
}

export default Header;