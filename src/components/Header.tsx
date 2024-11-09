import {
    Avatar,
    Box,
    Button,
    Divider,
    IconButton,
    List,
    ListItem,
    ListItemButton, ListItemIcon,
    SwipeableDrawer, Typography,
} from "@mui/material";
import Navbar from "./Navbar.tsx";
import HeaderProps from "../component-props/header-props.ts";
import {useNavigate} from "react-router-dom";
import {Close, LibraryBooks, Login, Logout, MenuRounded, Search} from "@mui/icons-material";
import {useState} from "react";
import {MENU_ITEMS} from "../common/constants.ts";
import {useAuth} from "../contexts/AuthContext.tsx";
import {nameToColor} from "../common/utility.ts";
import SearchBar from "./SearchBar.tsx";

const DrawerMenu = () => {
    const navigate = useNavigate();
    const {isAuthenticated, currentUser} = useAuth();

    return (
        <Box role={"menu"}
             className={"xxs:max-xs:w-[200px] lg:w-[375px]"}>
            {isAuthenticated ?
                <List>
                    <ListItem sx={{
                        paddingTop: 3,
                        paddingLeft: 3
                    }}>
                        <ListItemIcon className={"xxs:mr-0 lg:mr-[8px]"}>
                            <Avatar className={"xxs:w-[35px] xxs:h-[35px] lg:w-[50px] lg:h-[50px] xxs:text-[16px] lg:text-[20px] xxs:mr-0 lg:mr-2"}
                                sx={{
                                    bgcolor: nameToColor(currentUser !== null? currentUser.username : null),
                                }}>
                                {currentUser?.username[0]}
                            </Avatar>
                        </ListItemIcon>
                        <Typography className={"xxs:text-[15px] lg:text-[30px]"}>
                            {currentUser?.username}
                        </Typography>
                    </ListItem>
                    <ListItem className={"xxs:max-md:pl-2"}>
                        <ListItemButton onClick={() => navigate("/my-contributions")}>
                            <ListItemIcon className={"xxs:max-md:pr-0"}>
                                <LibraryBooks color={"primary"}
                                              className={"xxs:text-[25px] lg:text-4xl"}/>
                            </ListItemIcon>
                            <Typography className={"xxs:text-[15px] lg:text-[30px]"}>
                                My Contributions
                            </Typography>
                        </ListItemButton>
                    </ListItem>
                </List>
            : null}

            <Divider/>

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
                            onClick={() => navigate("/contribute")}
                            className={"lg:text-3xl capitalize lg:py-2 lg:px-5"}>
                        Contribute
                    </Button>
                </ListItem>
            </List>

            <Divider style={{
                position: "absolute",
                bottom: 1,
            }}/>

            <List style={{
                position: "absolute",
                bottom: 24,
                width: "100%"
            }}>
                <ListItem style={{
                    width: "100%",
                }}>
                    <ListItemButton onClick={() => isAuthenticated ? navigate("/logout") : navigate("/login")}>
                        <Typography className={"xxs:text-[15px] lg:text-[40px] xxs:flex-grow"}>
                            {isAuthenticated ? "Logout" : "Login"}
                        </Typography>
                        <ListItemIcon>
                            {isAuthenticated ?
                                <Logout color={"primary"}
                                        className={"xxs:text-[25px] lg:text-4xl"}/>
                                : <Login color={"primary"}
                                          className={"xxs:text-[25px] lg:text-4xl"}/>}

                        </ListItemIcon>
                    </ListItemButton>
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

    return (
        <header className={"bg-white static top-0 z-50 flex lg:justify-between xl:justify-center items-center xxs:p-1 lg:px-8 border-0 border-b-2 border-solid border-b-gray-300"}>
            <Typography variant="h5" className={"font-semibold mr-14 text-nowrap xxs:hidden xl:block"}
                        onClick={() => navigate("/home")}>
                The Kadazandusun Dictionary
            </Typography>

            {/*mobile view elements*/}
            <IconButton className={"lg:block xl:hidden xxs:pr-4 lg:pr-10"}
                        onClick={() => toggleDrawer()}>
                <MenuRounded className={"xxs:text-2xl lg:text-5xl"}/>
            </IconButton>
            <div className="xl:hidden lg:block w-full flex justify-center items-center">
                {isSearchBarOpen ?
                    <SearchBar isDisabled={false} classString={"xxs:text-[12px] lg:text-4xl xxs:my-2.5 lg:my-5 xl:hidden"}>
                        <IconButton type={"submit"}>
                            <Search cursor={"pointer"}
                                    className={"xxs:text-2xl lg:text-5xl"}/>
                        </IconButton>
                    </SearchBar>
                    : <Typography variant="h5" className={"font-semibold mr-0 xxs:text-[16px] lg:text-5xl xxs:py-6 lg:py-10 text-nowrap text-center"}
                                  onClick={() => navigate("/home")}>
                        The Kadazandusun Dictionary
                    </Typography>}
            </div>
            <IconButton className={"lg:block xl:hidden pl-4"}
                        onClick={() => toggleSearchBar()}>
                {isSearchBarOpen ?
                    <Close className={"xxs:text-2xl lg:text-5xl"}/>
                    : <Search className={"xxs:text-2xl lg:text-5xl"}/>}
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