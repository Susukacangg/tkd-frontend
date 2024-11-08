import {
    Avatar,
    Box,
    Button,
    Divider,
    IconButton,
    List,
    ListItem,
    ListItemButton, ListItemIcon,
    ListItemText, SwipeableDrawer,
    Typography
} from "@mui/material";
import Navbar from "./Navbar.tsx";
import HeaderProps from "../component-props/header-props.ts";
import {useNavigate} from "react-router-dom";
import {LibraryBooks, Login, Logout, MenuRounded} from "@mui/icons-material";
import {useState} from "react";
import {MENU_ITEMS} from "../common/constants.ts";
import {useAuth} from "../contexts/AuthContext.tsx";
import {nameToColor} from "../common/utility.ts";

const HeaderTitle = () => {
    const navigate = useNavigate();

    return (
        <Typography variant="h5" className={"font-semibold xl:mr-14 sm:mr-0 sm:text-5xl xl:text-2xl sm:py-10 xl:py-0 text-nowrap"}
                    onClick={() => navigate("/home")}>
            The Kadazandusun Dictionary
        </Typography>
    );
}

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
                    <ListItemText primary={
                        <Button variant={"contained"}
                                onClick={() => navigate("/contribute")}
                                style={{
                                    fontSize: 30,
                                    textTransform: "capitalize",
                                    borderRadius: 10
                                }}>
                            Contribute
                        </Button>}/>
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

    const toggleDrawer = () => {
        setDrawerOpen(!isDrawerOpen);
    }

    return (
        <header className={"bg-white static top-0 z-50 flex justify-center items-center px-8 border-0 border-b-2 border-solid border-b-gray-300"}>
        {/*items center kasi center the text in the middle line*/}
            <HeaderTitle/>
            <Navbar enableHomeOnly={enableHomeOnly}
                    enableContributeBtn={enableContributeBtn}
                    enableSearchBar={enableSearchBar}
                    enableAvatar={enableAvatar}/>
            <IconButton className={"sm:block xl:hidden place-self-center absolute left-8"}
                        onClick={() => toggleDrawer()}>
                <MenuRounded className={"text-5xl"}/>
            </IconButton>
            <SwipeableDrawer open={isDrawerOpen}
                             onOpen={toggleDrawer}
                             onClose={toggleDrawer}>
                <DrawerMenu/>
            </SwipeableDrawer>
        </header>
    );
}

export default Header;