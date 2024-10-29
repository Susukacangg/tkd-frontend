import {useNavigate} from "react-router-dom";
import {Card, IconButton, ListItemIcon, Menu, MenuItem, Tooltip, Typography} from "@mui/material";
import {MoreVert, Report} from "@mui/icons-material";
import DictionaryItem from "../dto/DictionaryItem.ts";
import {useState} from "react";


function WordListItem({dictionaryItem}: {dictionaryItem: DictionaryItem }) {
    const navigate = useNavigate();
    const [isHoverOptionsButton, setIsHoverOptionsButton] = useState(false);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const isOptionsOpen = Boolean(anchorEl);

    const handleCardClick = () => {
        if(!isHoverOptionsButton)
            navigate(`/definition/${dictionaryItem.wordId}`);
    }

    const handleOptionsButtonHover = (e: any) => {
        if(e.type === "mouseenter")
            setIsHoverOptionsButton(true);
        else if (e.type === "mouseleave")
            setIsHoverOptionsButton(false)
    }

    const handleReportOptionClick = (e: any) => {
        setAnchorEl(null);
        e.stopPropagation();
    }

    return (
        <Card className={`py-8 px-6 rounded-lg bg-white hover:bg-gray-100 cursor-pointer normal-case ${isHoverOptionsButton? "" : "active:bg-gray-200"}`}
              onClick={handleCardClick}
              sx={{boxShadow: 5}}>
            <div className={"flex items-center justify-between w-full"}>
                <div className="flex flex-col items-start w-full">
                    <Typography variant={"h5"}>
                        {dictionaryItem.word}
                    </Typography>
                    <Typography variant={"h6"}
                                color={"textDisabled"}
                                className={"font-semibold"}>
                        {dictionaryItem.translations.split(";").map((value, index, array) => {
                            let translation = value;
                            if (index !== array.length - 1)
                                translation += "; ";
                            return translation;
                        })}
                    </Typography>
                </div>
                <Tooltip title={"More options"}>
                    <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}
                                onMouseEnter={handleOptionsButtonHover}
                                onMouseLeave={handleOptionsButtonHover}>
                        <MoreVert/>
                    </IconButton>
                </Tooltip>
                <Menu open={isOptionsOpen}
                      anchorEl={anchorEl}
                      onClick={() => setAnchorEl(null)}
                      onClose={() => setAnchorEl(null)}
                      slotProps={{
                          root: {
                              slotProps: {
                                  backdrop: {
                                      onClick: (e) => e.stopPropagation(),
                                  },
                              },
                          }
                      }}
                      sx={{
                          '& .MuiModal-backdrop': {
                              backgroundColor: "transparent",
                          }
                      }}>
                    <MenuItem color={"error"}
                              onClick={handleReportOptionClick}>
                        <ListItemIcon>
                            <Report color={"error"}/>
                        </ListItemIcon>
                        Report this contribution
                    </MenuItem>
                </Menu>
            </div>
        </Card>
    );
}

export default WordListItem;