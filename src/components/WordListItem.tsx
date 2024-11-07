import {useNavigate} from "react-router-dom";
import {Card, IconButton, ListItemIcon, Menu, MenuItem, Tooltip, Typography} from "@mui/material";
import {MoreVert, Report} from "@mui/icons-material";
import {useState} from "react";
import Word from "../dto/Word.ts";
import Translation from "../dto/Translation.ts";


function WordListItem({word}: {word: Word}) {
    const navigate = useNavigate();
    const [isHoverOptionsButton, setIsHoverOptionsButton] = useState(false);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const isOptionsOpen = Boolean(anchorEl);

    const handleCardClick = () => {
        if(!isHoverOptionsButton)
            navigate(`/definition/${word.wordId}`);
    }

    const handleOptionsButtonHover = (e: any) => {
        if(e.type === "mouseenter")
            setIsHoverOptionsButton(true);
        else if (e.type === "mouseleave")
            setIsHoverOptionsButton(false)
    }

    const handleReportOptionClick = (e: any) => {
        setAnchorEl(null);
        navigate(`/report/${word.wordId}`, {
            state: word
        });
        e.stopPropagation();
    }

    return (
        <Card className={`w-full box-border py-8 px-6 rounded-lg bg-white hover:bg-gray-100 cursor-pointer normal-case ${isHoverOptionsButton? "" : "active:bg-gray-200"}`}
              onClick={handleCardClick}
              sx={{boxShadow: 5}}>
            <div className={"flex items-center justify-between w-full"}>
                <div className="flex flex-col items-start w-full">
                    <Typography variant={"h5"}>
                        {word.word}
                    </Typography>
                    <Typography variant={"h6"}
                                color={"textDisabled"}
                                className={"font-semibold"}>
                        {word.translations.map((value: Translation, index: number, array: Translation[]) => {
                            let translation = value.translation;
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