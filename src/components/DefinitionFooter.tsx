import {Button, CircularProgress, IconButton, Tooltip} from "@mui/material";
import {Report} from "@mui/icons-material";
import {useNavigate} from "react-router-dom";
import Word from "../dto/Word.ts";

interface DefinitionFooterProps {
    isUsersWord: boolean;
    isUserAdmin: boolean;
    isDeleting: boolean;
    currentWord: Word | null;
    handleDeleteClick: () => Promise<void>;
}

function DefinitionFooter({isUsersWord, isUserAdmin, isDeleting, currentWord, handleDeleteClick}: DefinitionFooterProps) {
    const navigate = useNavigate();

    return (
        <div className="flex justify-between items-center lg:mt-20 xl:mt-16">
            <div className="flex items-center gap-6">
                {isUsersWord || isUserAdmin ? (
                    <>
                        <Button variant={"contained"}
                                color={"primary"}
                                className={"lg:px-12 lg:py-3 xl:px-6 xl:py-2 xxs:text-[10px] lg:text-3xl xl:text-sm"}
                                disabled={isDeleting}
                                onClick={() => navigate(`/edit/${currentWord?.wordId}`, {
                                    state: currentWord
                                })}>
                            Edit
                        </Button>
                        <Button variant={"contained"}
                                color={"error"}
                                className={"lg:px-12 lg:py-3 xl:px-6 xl:py-2 xxs:text-[10px] lg:text-3xl xl:text-sm"}
                                disabled={isDeleting}
                                onClick={handleDeleteClick}>
                            {isDeleting ? <CircularProgress size={25} color={"error"}/> : "Delete"}
                        </Button>
                    </>) : null}
            </div>
            <Tooltip title={"Report this contribution"}>
                <IconButton color={"error"}
                            size={"large"}
                            onClick={() => navigate(`/report/${currentWord?.wordId}`, {
                                state: currentWord
                            })}>
                    <Report className={"lg:text-5xl xl:text-3xl"}/>
                </IconButton>
            </Tooltip>
        </div>
    );
}

export default DefinitionFooter;