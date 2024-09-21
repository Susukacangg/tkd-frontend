import WordListItemProps from "../component-props/word-list-item-props.ts";
import {useNavigate} from "react-router-dom";
import {Button, Typography} from "@mui/material";
import {ArrowForward} from "@mui/icons-material";


function WordListItem({wordData}: WordListItemProps) {
    const navigate = useNavigate();

    return (
        <Button variant={"contained"}
                color={"secondary"}
                className={"py-8 px-6 rounded-lg bg-white hover:bg-gray-100 cursor-pointer normal-case"}
                onClick={() => navigate("/definition/" + wordData.id)}>
            <div className={"flex items-center justify-between w-full"}>
                <Typography variant={"h5"} >
                    {wordData.word}
                </Typography>
                <ArrowForward/>
            </div>
        </Button>
    );
}

export default WordListItem;