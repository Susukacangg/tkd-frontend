import {NavLink, NavLinkProps, useNavigate} from "react-router-dom";
import '@fortawesome/free-solid-svg-icons';
import {Avatar, Button} from "@mui/material";
import SearchBar from "./SearchBar.tsx";
import NavBarProps from "../component-props/nav-bar-props.ts";

const navLinkItems: NavLinkProps[] = [
    {to: "/home", children: "Home"},
    {to: "/about", children: "About"},
    {to: "/contact", children: "Contact"}
]

const NavLinks = ({enableHomeOnly, enableContributeBtn}: NavBarProps) => {
    let navLinks = enableHomeOnly ? navLinkItems.slice(0, 1) : navLinkItems;
    const navigate = useNavigate();

    return (
        <div className={"flex justify-between items-center h-full " + (enableHomeOnly || !enableContributeBtn? "w-1/5": "w-2/5")}>
            {navLinks.map((navLink) => (
                <NavLink key={navLink.to.toString()} to={navLink.to}
                         className={({isActive}) => (isActive? "bg-primary text-white " : "bg-none text-black ") +
                             "h-full rounded-lg py-1 px-3 hover:bg-amber-200 hover:text-blue-gray-700 no-underline text-lg"}>
                    {navLink.children}
                </NavLink>
            ))}
            {enableContributeBtn &&
                <Button onClick={() => (navigate("/contribute"))}
                        variant={"contained"}
                        color={"primary"}
                        className={"capitalize"}>
                    Contribute
                </Button>}
        </div>
    );
}

function Navbar({enableHomeOnly = false, enableContributeBtn = true, enableSearchBar = true, enableAvatar = true}: NavBarProps) {
    return (
        <>
            <nav className={"flex grow justify-between items-center h-full py-4"}>
                <NavLinks enableHomeOnly={enableHomeOnly} enableContributeBtn={enableContributeBtn} />
                <div className={"flex flex-row items-center " + (enableSearchBar? "justify-between" : "justify-end")}>
                    {enableSearchBar && <SearchBar/>}
                    {enableAvatar && <Avatar srcSet="../../public/mt-avatar.jpg" alt={"avatar"}
                                             className={"ml-5 cursor-pointer"}/>}
                </div>
            </nav>
        </>
    );
}

export default Navbar;