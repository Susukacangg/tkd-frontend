import {
    Avatar,
    Box,
    Button,
    Divider,
    IconButton,
    List,
    ListItem,
    ListItemButton, ListItemIcon,
    ListItemText, SwipeableDrawer, Typography,
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
             sx={{
                 width: 375
             }}>
            {isAuthenticated ?
                <List>
                    <ListItem sx={{
                        paddingTop: 3,
                        paddingLeft: 3
                    }}>
                        <ListItemIcon style={{
                            marginRight: 8
                        }}>
                            <Avatar sx={{
                                bgcolor: nameToColor(currentUser !== null? currentUser.username : null),
                                width: 50,
                                height: 50,
                                fontSize: "20px",
                                marginRight: 2
                            }}>
                                {currentUser?.username[0]}
                            </Avatar>
                        </ListItemIcon>
                        <ListItemText primary={currentUser?.username}
                                      sx={{
                                          ".MuiListItemText-primary": {
                                              fontSize: 30,
                                          }
                                      }}/>
                    </ListItem>
                    <ListItem>
                        <ListItemButton onClick={() => navigate("/my-contributions")}>
                            <ListItemIcon>
                                <LibraryBooks color={"primary"} fontSize={"large"}/>
                            </ListItemIcon>
                            <ListItemText primary={"My Contributions"}
                                          sx={{
                                              ".MuiListItemText-primary": {
                                                  fontSize: 30,
                                              }
                                          }}/>
                        </ListItemButton>
                    </ListItem>
                </List>
            : null}

            <Divider/>

            <List>
                {MENU_ITEMS.map((item) => (
                    <ListItem key={item.to as string}>
                        <ListItemButton onClick={() => navigate(item.to)}>
                            <ListItemText primary={item.children as string}
                                          sx={{
                                              ".MuiListItemText-primary": {
                                                  fontSize: 30,
                                              }
                                          }}/>
                        </ListItemButton>
                    </ListItem>
                ))}
                <ListItem sx={{
                    paddingTop: 3,
                    paddingLeft: 3
                }}>
                    <Button variant={"contained"}
                            onClick={() => navigate("/contribute")}
                            className={"text-3xl capitalize py-2 px-5"}>
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
                    width: "100%"
                }}>
                    <ListItemButton onClick={() => isAuthenticated ? navigate("/logout") : navigate("/login")}>
                        <ListItemText primary={isAuthenticated ? "Logout" : "Login"}
                                      sx={{
                                          ".MuiListItemText-primary": {
                                              fontSize: 40,
                                          }
                                      }}/>
                        <ListItemIcon>
                            {isAuthenticated ?
                                <Logout fontSize={"large"}
                                       color={"primary"}/>
                                : <Login fontSize={"large"}
                                         color={"primary"}/>}

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
        <header className={"bg-white static top-0 z-50 flex sm:justify-between xl:justify-center items-center px-8 border-0 border-b-2 border-solid border-b-gray-300"}>
            <Typography variant="h5" className={"font-semibold mr-14 text-nowrap sm:hidden xl:block"}
                        onClick={() => navigate("/home")}>
                The Kadazandusun Dictionary
            </Typography>

            {/*mobile view elements*/}
            <IconButton className={"sm:block xl:hidden pr-10"}
                        onClick={() => toggleDrawer()}>
                <MenuRounded className={"text-5xl"}/>
            </IconButton>
            <div className="xl:hidden sm:block w-full flex justify-center items-center">
                {isSearchBarOpen ?
                    <SearchBar isDisabled={false} classString={"text-4xl my-5 xl:hidden"}>
                        <IconButton type={"submit"}>
                            <Search cursor={"pointer"}
                                    className={"text-5xl"}/>
                        </IconButton>
                    </SearchBar>
                    : <Typography variant="h5" className={"font-semibold mr-0 text-5xl py-10 text-nowrap text-center"}
                                  onClick={() => navigate("/home")}>
                        The Kadazandusun Dictionary
                    </Typography>}
            </div>
            <IconButton className={"sm:block xl:hidden pl-8"}
                        onClick={() => toggleSearchBar()}>
                {isSearchBarOpen ?
                    <Close className={"text-5xl"}/>
                    : <Search className={"text-5xl"}/>}
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