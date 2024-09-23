import {Typography} from "@mui/material";
import Navbar from "./Navbar.tsx";
import {ReactElement} from "react";

const HeaderTitle = () => {
    return (
        <Typography variant="h5" className={"font-semibold mr-14 text-nowrap"}>The Kadazandusun Dictionary</Typography>
    );
}

function Header({children = <Navbar/>}: {children?: ReactElement}) {

    return (
        // items center kasi center the text in the middle line
        <header className={"bg-white sticky top-0 z-50 flex items-center px-8 border-0 border-b-2 border-solid border-b-gray-200"}>
            <HeaderTitle/>
            {children}
        </header>
    );
}

export default Header