import {NavLink, NavLinkProps, useNavigate} from "react-router-dom";
import {Avatar, Button, Divider, IconButton, ListItemIcon, Menu, MenuItem, Tooltip} from "@mui/material";
import SearchBar from "./SearchBar.tsx";
import {useContext, useState} from "react";
import {Logout, Settings} from "@mui/icons-material";
import {HeaderContext} from "../contexts/HeaderContext.ts";

const NavLinks = ({enableHomeOnly, enableContributeBtn}: {enableHomeOnly?: boolean, enableContributeBtn?: boolean}) => {
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
                <Button variant={"contained"}
                        color={"primary"}
                        className={"capitalize"}
                        onClick={() => (navigate("/contribute"))}>
                    Contribute
                </Button>}
        </div>
    );
}

const ProfileIcon = ({name}: {name?: string}) => {

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const isMenuOpen = Boolean(anchorEl);

    const nameToColor = (name?: string): string => {
        let color: string = "";

        if(name !== undefined) {
            let hash: number = 0;
            for(let i = 0; i < name.length; i++) {
                hash = name.charCodeAt(i) + ((hash << 6) - hash);
            }

            color = "#";

            for(let i = 0; i < 3; i++) {
                const value = (hash >> (i * 8)) & 0xff;
                color += `00${value.toString(16)}`.slice(-2)
            }
        }

        return color;
    }

    const avatarDisplay = (name?: string) => {
        let firstInitial, lastInitial, avatarImg = "";

        if(name !== undefined){
            const nameArray = name.split(' ');
            firstInitial = nameArray[0][0];
            lastInitial = nameArray.length > 1? nameArray[nameArray.length - 1][0] : "";
        } else {
            avatarImg = "/mt-avatar.jpg";
        }

        return {
            sx: {
                bgcolor: nameToColor(name),
            },
            children: `${firstInitial}${lastInitial}`,
            src: avatarImg,
        }
    }

    return (
        <>
            <Tooltip title={"Account settings"}>
                <IconButton className={"ml-4"}
                            onClick={(e) => setAnchorEl(e.currentTarget)}
                            sx={{color: nameToColor(name)}}>
                    <Avatar {...avatarDisplay(name)}/>
                </IconButton>
            </Tooltip>
            <Menu open={isMenuOpen}
                  anchorEl={anchorEl}
                  onClick={() => setAnchorEl(null)}
                  onClose={() => {setAnchorEl(null)}}>
                <MenuItem>My Account</MenuItem>
                <Divider />
                <MenuItem>
                    <ListItemIcon>
                        <Settings/>
                    </ListItemIcon>
                    Settings
                </MenuItem>
                <MenuItem>
                    <ListItemIcon>
                        <Logout/>
                    </ListItemIcon>
                    Logout
                </MenuItem>
            </Menu>
        </>
    );
}

function Navbar() {

    const {userName, enableHomeOnly, enableContributeBtn, enableSearchBar, enableAvatar} = useContext(HeaderContext);

    return (
        <nav className={"flex grow justify-between items-center h-full"}>
            <NavLinks enableHomeOnly={enableHomeOnly} enableContributeBtn={enableContributeBtn} />
            <div className={"flex flex-row items-center w-1/3 " + (enableSearchBar? "justify-between" : "justify-end")}>
                {enableSearchBar && <SearchBar/>}
                {enableAvatar && <ProfileIcon name={userName}/>}
            </div>
        </nav>
    );
}

export default Navbar;