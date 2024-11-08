import {NavLink, useNavigate} from "react-router-dom";
import {Button, IconButton} from "@mui/material";
import SearchBar from "./SearchBar.tsx";
import {Search} from "@mui/icons-material";
import {useAuth} from "../contexts/AuthContext.tsx";
import HeaderProps from "../component-props/header-props.ts";
import {MENU_ITEMS} from "../common/constants.ts";
import ProfileIcon from "./ProfileIcon.tsx";

const NavLinks = ({enableHomeOnly, enableContributeBtn}: {enableHomeOnly?: boolean, enableContributeBtn?: boolean}) => {
    let navLinks = enableHomeOnly ? MENU_ITEMS.slice(0, 1) : MENU_ITEMS;

    const navigate = useNavigate();

    return (
        <div className={`flex justify-between items-center h-full my-6 ${enableHomeOnly || !enableContributeBtn? "w-1/6": "w-1/3"} ${enableHomeOnly && enableContributeBtn? "w-1/6" : ""}`}>
            {navLinks.map((navLink) => (
                <NavLink key={navLink.to.toString()} to={navLink.to}
                         className={({isActive}) => (isActive? "bg-primary text-white " : "bg-none text-black ") +
                             "h-full rounded-lg py-1 px-3 hover:bg-amber-200 hover:text-blue-gray-700 no-underline text-lg"}>
                    {navLink.children}
                </NavLink>
            ))}
            {enableContributeBtn &&
                <Button variant={"contained"}
                        color={"primary"}
                        className={"capitalize"}
                        onClick={() => (navigate("/contribute"))}>
                    Contribute
                </Button>}
        </div>
    );
}

function Navbar({enableHomeOnly, enableContributeBtn, enableSearchBar, enableAvatar}: HeaderProps) {
    const {currentUser} = useAuth();

    return (
        <nav className={"xl:flex sm:hidden grow justify-between items-center h-full"}>
            <NavLinks enableHomeOnly={enableHomeOnly} enableContributeBtn={enableContributeBtn} />
            <div className={`flex flex-row items-center w-1/3 ${enableSearchBar? "justify-between" : "justify-end"}`}>
                {enableSearchBar &&
                    <SearchBar classString={"text-md"}>
                        <IconButton type={"submit"}>
                            <Search cursor={"pointer"}/>
                        </IconButton>
                    </SearchBar>}
                {enableAvatar && <ProfileIcon name={currentUser !== null? currentUser.username : null}/>}
            </div>
        </nav>
    );
}

export default Navbar;