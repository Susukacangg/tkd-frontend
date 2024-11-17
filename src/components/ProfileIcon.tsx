import {useState} from "react";
import {useAuth} from "../contexts/AuthContext.tsx";
import {useNavigate} from "react-router-dom";
import {Avatar, Divider, IconButton, ListItemIcon, Menu, MenuItem, Skeleton, Tooltip, Typography} from "@mui/material";
import {LibraryBooks, Login, Logout} from "@mui/icons-material";
import {getAvatarDisplay, nameToColor} from "../common/utility.ts";

const ProfileIcon = ({name}: {name: string | null}) => {

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const {isAuthenticated, isLoadingUser} = useAuth();
    const navigate = useNavigate();
    const isMenuOpen = Boolean(anchorEl);

    return (
        <>
            <Tooltip title={"Account"}>
                <div className={"inline-block"}>
                    <IconButton className={"ml-4"}
                                disabled={isLoadingUser}
                                onClick={(e) => setAnchorEl(e.currentTarget)}
                                sx={{color: nameToColor(name)}}>
                        {isLoadingUser ? <Skeleton variant={"circular"} width={40} height={40}></Skeleton>
                            : <Avatar {...getAvatarDisplay(name)}/>}
                    </IconButton>
                </div>
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
                ):
                    <Typography className={"px-3 pt-2 pb-4"}>
                        Welcome, Guest!
                    </Typography>
                }

                <Divider/>

                <MenuItem onClick={() => isAuthenticated? navigate("/logout") : navigate("/login")}>
                    <ListItemIcon>
                        {isAuthenticated? <Logout sx={{color: "black"}}/> : <Login color={"primary"}/>}
                    </ListItemIcon>
                    {isAuthenticated? "Logout" : "Sign in"}
                </MenuItem>
            </Menu>
        </>
    );
}

export default ProfileIcon;