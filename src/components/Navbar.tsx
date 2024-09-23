import {NavLink, NavLinkProps, useNavigate} from "react-router-dom";
import '@fortawesome/free-solid-svg-icons';
import {Avatar, Button} from "@mui/material";
import SearchBar from "./SearchBar.tsx";

interface NavBarProps {
    enableHomeOnly?: boolean;
    enableContributeBtn?: boolean;
    enableSearchBar?: boolean;
    enableAvatar?: boolean;
}

const NavLinks = ({enableHomeOnly, enableContributeBtn}: NavBarProps) => {
    const navLinkItems: NavLinkProps[] = [
        {to: "/home", children: "Home"},
        {to: "/about", children: "About"},
        {to: "/contact", children: "Contact"}
    ]

    let navLinks = enableHomeOnly ? navLinkItems.slice(0, 1) : navLinkItems;
    const navigate = useNavigate();

    return (
        <div className={"flex justify-between items-center h-full my-6 " + (enableHomeOnly || !enableContributeBtn? "w-1/4": "w-2/5")}>
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

const ProfileIcon = ({name}: {name: string}) => {

    const nameToColor = (name: string): string => {
        let hash: number = 0;
        for(let i = 0; i < name.length; i++) {
            hash = name.charCodeAt(i) + ((hash << 6) - hash);
        }

        let color: string = "#";

        for(let i = 0; i < 3; i++) {
            const value = (hash >> (i * 8)) & 0xff;
            color += `00${value.toString(16)}`.slice(-2)
        }

        return color;
    }

    const avatarDisplay = (name: string) => {
        const nameArray = name.split(' ');
        const firstInitial = nameArray[0][0];
        let lastInitial;
        if(nameArray.length > 1)
            lastInitial = nameArray[nameArray.length - 1][0];
        else
            lastInitial = "";

        return {
            sx: {
                bgcolor: nameToColor(name),
            },
            children: `${firstInitial}${lastInitial}`,
        }
    }

    return (
        <>
            <Avatar {...avatarDisplay(name)}
                    className={"ml-5 cursor-pointer"}/>
        </>
    );
}

function Navbar({enableHomeOnly = false, enableContributeBtn = true, enableSearchBar = true, enableAvatar = true}: NavBarProps) {
    return (
        <>
            <nav className={"flex grow justify-between items-center h-full"}>
                <NavLinks enableHomeOnly={enableHomeOnly} enableContributeBtn={enableContributeBtn} />
                <div className={"flex flex-row items-center w-1/3 " + (enableSearchBar? "justify-between" : "justify-end")}>
                    {enableSearchBar && <SearchBar/>}
                    {enableAvatar && <ProfileIcon name={"Zachary Jobb Jude Abel Logijin"}/>}
                </div>
            </nav>
        </>
    );
}

export default Navbar;