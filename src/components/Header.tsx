import {
    Avatar,
    Box,
    Button, CircularProgress,
    Divider,
    IconButton,
    List,
    ListItem,
    ListItemButton, ListItemIcon, Menu, MenuItem, Skeleton,
    SwipeableDrawer, Typography, useMediaQuery,
} from "@mui/material";
import Navbar from "./Navbar.tsx";
import HeaderProps from "../component-props/header-props.ts";
import {useNavigate} from "react-router-dom";
import {Close, LibraryBooks, Login, Logout, MenuRounded, Search} from "@mui/icons-material";
import {useEffect, useState} from "react";
import {MENU_ITEMS} from "../common/constants.ts";
import {useAuth} from "../contexts/AuthContext.tsx";
import {nameToColor} from "../common/utility.ts";
import SearchBar from "./SearchBar.tsx";

const DrawerMenu = () => {
    const navigate = useNavigate();
    const {isAuthenticated, currentUser, isLoadingUser, isAuthenticating} = useAuth();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const isProfileMenuOpen = Boolean(anchorEl);

    return (
        <Box role={"menu"}
             className={"xxs:w-[275px] xs:w-[300px] sm:w-[400px] lg:w-[425px]"}>
            <List>
                <ListItem>
                    <ListItemButton disabled={isLoadingUser}
                                    onClick={(e) => setAnchorEl(e.currentTarget)}>
                        <ListItemIcon className={"xxs:-mr-1 lg:mr-2"}>
                            {isLoadingUser ? <Skeleton variant={"circular"}
                                                       className={"xxs:w-[35px] xxs:h-[35px] lg:w-[50px] lg:h-[50px]"}></Skeleton>
                            : <Avatar className={"xxs:w-[35px] xxs:h-[35px] lg:w-[50px] lg:h-[50px] xxs:text-[16px] lg:text-[20px]"}
                                      sx={{
                                          bgcolor: nameToColor(currentUser !== null? currentUser.username : null),
                                      }}>
                                    {currentUser?.username[0]}
                                </Avatar>}
                        </ListItemIcon>
                        {isLoadingUser ? <Skeleton variant={"rounded"}
                                                   className={"w-[200px]"}></Skeleton>
                            : <Typography className={"xxs:text-[15px] lg:text-[30px]"}>
                                {isAuthenticated ? currentUser?.username : "Welcome, Guest!"}
                            </Typography>}
                    </ListItemButton>
                </ListItem>
                <Menu open={isProfileMenuOpen}
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

                    <MenuItem onClick={() => isAuthenticated? navigate("/logout") : navigate("/login")}>
                        <ListItemIcon>
                            {isAuthenticated? <Logout sx={{color: "black"}}/> : <Login color={"primary"}/>}
                        </ListItemIcon>
                        {isAuthenticated? "Logout" : "Sign in"}
                    </MenuItem>
                </Menu>
            </List>

            <Divider/>

            {/*menu options*/}
            <List>
                {MENU_ITEMS.map((item) => (
                    <ListItem key={item.to as string}>
                        <ListItemButton onClick={() => navigate(item.to)}>
                            <Typography className={"xxs:text-[15px] lg:text-[30px]"}>
                                {item.children as string}
                            </Typography>
                        </ListItemButton>
                    </ListItem>
                ))}
                <ListItem sx={{
                    paddingTop: 2,
                    paddingLeft: 3
                }}>
                    <Button variant={"contained"}
                            disabled={isAuthenticating}
                            onClick={() => navigate("/contribute")}
                            className={`lg:text-3xl capitalize ${isAuthenticating ? "px-10 py-2" : ""} lg:py-2 lg:px-5`}>
                        {isAuthenticating ?
                            <CircularProgress size={20}/>
                            : "Contribute"}
                    </Button>
                </ListItem>
            </List>
        </Box>
    );
}

function Header({enableHomeOnly = false, enableAvatar = true, enableSearchBar = true, enableContributeBtn = true}: HeaderProps) {
    const [isDrawerOpen, setDrawerOpen] = useState(false);
    const navigate = useNavigate();
    const [isSearchBarOpen, setSearchBarOpen] = useState(false);

    const toggleDrawer = () => {
        setDrawerOpen(!isDrawerOpen);
    }

    const toggleSearchBar = () => {
        setSearchBarOpen(prevState => !prevState);
    }

    const isDrawerHidden: boolean = useMediaQuery('(min-width: 1280px)');

    useEffect(() => {
        if (isDrawerHidden)
            setDrawerOpen(false);
    }, [isDrawerHidden]);

    return (
        <header className={"bg-white static top-0 z-50 flex lg:justify-between xl:justify-center items-center xxs:p-1 lg:px-8 border-0 border-b-2 border-solid border-b-gray-300"}>
            <Typography variant="h5" className={"font-semibold mr-14 text-nowrap xxs:hidden xl:block cursor-pointer"}
                        onClick={() => navigate("/home")}>
                The Kadazandusun Dictionary
            </Typography>

            {/*mobile view elements*/}
            {/*drawer menu button*/}
            <IconButton className={"lg:block xl:hidden xxs:pr-4 lg:pr-10"}
                        onClick={() => toggleDrawer()}>
                <MenuRounded className={"xxs:max-md:text-2xl lg:text-5xl"}/>
            </IconButton>
            {/*mobile search bar*/}
            <div className="xl:hidden lg:block w-full flex justify-center items-center">
                {isSearchBarOpen ?
                    <SearchBar isDisabled={false} classString={"xxs:text-[12px] lg:text-4xl xxs:my-2.5 lg:my-5 xl:hidden"}>
                        <IconButton type={"submit"}>
                            <Search cursor={"pointer"}
                                    className={"xxs:max-md:text-2xl lg:text-5xl"}/>
                        </IconButton>
                    </SearchBar>
                    : <Typography variant="h5" className={"font-semibold mr-0 xxs:max-xs:text-[16px] md:max-xl:text-4xl xxs:py-6 lg:py-10 text-nowrap text-center cursor-pointer"}
                                  onClick={() => navigate("/home")}>
                        The Kadazandusun Dictionary
                    </Typography>}
            </div>
            {/*mobile search and close search icon*/}
            <IconButton className={"lg:block xl:hidden pl-4"}
                        onClick={() => toggleSearchBar()}>
                {isSearchBarOpen ?
                    <Close className={"xxs:max-md:text-2xl lg:text-5xl"}/>
                    : <Search className={"xxs:max-md:text-2xl lg:text-5xl"}/>}
            </IconButton>
            {/*mobile view elements*/}

            <Navbar enableHomeOnly={enableHomeOnly}
                    enableContributeBtn={enableContributeBtn}
                    enableSearchBar={enableSearchBar}
                    enableAvatar={enableAvatar}/>

            <SwipeableDrawer open={isDrawerOpen}
                             onOpen={toggleDrawer}
                             onClose={toggleDrawer}
                             className={"xl:hidden"}>
                <DrawerMenu/>
            </SwipeableDrawer>
        </header>
    );
}

export default Header;