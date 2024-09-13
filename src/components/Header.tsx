import {Typography} from "@material-tailwind/react";
import HeaderProps from "../component-props/header-props.ts";
import Navbar from "./Navbar.tsx";


const HeaderTitle = () => {
    return (
        <Typography variant="h4" className={"font-semibold mr-14 text-nowrap"}>The Kadazandusun Dictionary</Typography>
    );
}

function Header({children = <Navbar/>}: HeaderProps) {

    return (
        // items center kasi center the text in the middle line
        <header className={"bg-white sticky top-0 z-50 mx-auto flex w-full items-center p-8 border-b-grey border-2"}>
            <HeaderTitle/>
            {children}
        </header>
    );
}

export default Header