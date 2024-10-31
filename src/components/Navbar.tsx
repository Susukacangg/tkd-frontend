import {NavLink, NavLinkProps, useNavigate} from "react-router-dom";
import {Avatar, Button, Divider, IconButton, ListItemIcon, Menu, MenuItem, Tooltip} from "@mui/material";
import SearchBar from "./SearchBar.tsx";
import {useState} from "react";
import {LibraryBooks, Login, Logout, Search} from "@mui/icons-material";
import {useAuth} from "../contexts/AuthContext.tsx";
import HeaderProps from "../component-props/header-props.ts";

const NavLinks = ({enableHomeOnly, enableContributeBtn}: {enableHomeOnly?: boolean, enableContributeBtn?: boolean}) => {
    const navLinkItems: NavLinkProps[] = [
        {to: "/home", children: "Home"},
        {to: "/about", children: "About"},
    ]
    let navLinks = enableHomeOnly ? navLinkItems.slice(0, 1) : navLinkItems;

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

const ProfileIcon = ({name}: {name: string | null}) => {

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const {isAuthenticated, logoutUser} = useAuth();
    const navigate = useNavigate();
    const isMenuOpen = Boolean(anchorEl);

    const nameToColor = (name: string | null): string => {
        if (name !== null) {
            let color: string = "";

            if (name !== undefined) {
                let hash: number = 0;
                for (let i = 0; i < name.length; i++) {
                    hash = name.charCodeAt(i) + ((hash << 6) - hash);
                }

                color = "#";

                for (let i = 0; i < 3; i++) {
                    const value = (hash >> (i * 8)) & 0xff;
                    color += `00${value.toString(16)}`.slice(-2)
                }
            }

            return color;
        }

        return "";
    }

    const avatarDisplay = (name: string | null) => {
        let firstInitial, lastInitial, avatarImg = "";

        if(name !== null){
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

    const handleLogout = async () => {
        await logoutUser();
        navigate("/home");
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
                  onClose={() => setAnchorEl(null)}>

                {isAuthenticated? (
                    <MenuItem onClick={() => navigate("/my-contributions")}>
                        <ListItemIcon>
                            <LibraryBooks color={"primary"}/>
                        </ListItemIcon>
                        My contributions
                    </MenuItem>
                ): null}
                {isAuthenticated && <Divider/>}

                <MenuItem onClick={() => isAuthenticated? handleLogout() : navigate("/login")}>
                    <ListItemIcon>
                        {isAuthenticated? <Logout sx={{color: "black"}}/> : <Login color={"primary"}/>}
                    </ListItemIcon>
                    {isAuthenticated? "Logout" : "Login"}
                </MenuItem>
            </Menu>
        </>
    );
}

function Navbar({enableHomeOnly, enableContributeBtn, enableSearchBar, enableAvatar}: HeaderProps) {
    const {currentUser} = useAuth();

    return (
        <nav className={"flex grow justify-between items-center h-full"}>
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