import {NavLink, NavLinkProps} from "react-router-dom";
import '@fortawesome/free-solid-svg-icons';
import {Avatar, Button} from "@material-tailwind/react";
import SearchBar from "./SearchBar.tsx";
import NavBarProps from "../component-props/nav-bar-props.ts";

const navLinkItems: NavLinkProps[] = [
    {to: "/home", children: "Home"},
    {to: "/about", children: "About"},
    {to: "/contact", children: "Contact"}
]

const NavLinks = ({enableHomeOnly, enableContributeBtn}: NavBarProps) => {
    let navLinks = enableHomeOnly ? navLinkItems.slice(0, 1) : navLinkItems;
    console.log(navLinkItems);

    return (
        <div className={"flex justify-between items-center " + (enableHomeOnly? "w-1/5": "w-2/5")}>
            {navLinks.map((navLink) => (<NavLink key={navLink.to.toString()} to={navLink.to}>{navLink.children}</NavLink>))}
            {enableContributeBtn &&
                <Button className={"bg-primary text-md text-white rounded-md py-2 hover:bg-opacity-85 capitalize"}>
                    Contribute
                </Button>}
        </div>
    );
}

function Navbar({enableHomeOnly = false, enableContributeBtn = true, enableSearchBar = true, enableAvatar = true}: NavBarProps) {
    return (
        <>
            <nav className={"flex justify-between w-full items-center"}>
                <NavLinks enableHomeOnly={enableHomeOnly} enableContributeBtn={enableContributeBtn} />
                <div className={"flex items-center w-1/4 " + (enableSearchBar? "justify-between" : "justify-end")}>
                    {enableSearchBar && <SearchBar/>}
                    {enableAvatar && <Avatar srcSet="../../public/mt-avatar.jpg" alt={"avatar"}
                                             className={"ml-5 cursor-pointer"}/>}
                </div>
            </nav>
        </>
    );
}

export default Navbar;