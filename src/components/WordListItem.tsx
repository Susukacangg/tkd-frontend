import {useNavigate} from "react-router-dom";
import {Button, Typography} from "@mui/material";
import {ArrowForward} from "@mui/icons-material";
import DictionaryItem from "../dto/DictionaryItem.ts";


function WordListItem({dictionaryItem}: {dictionaryItem: DictionaryItem }) {
    const navigate = useNavigate();

    return (
        <Button variant={"contained"}
                color={"secondary"}
                className={"py-8 px-6 rounded-lg bg-white hover:bg-gray-100 cursor-pointer normal-case"}
                onClick={() => navigate("/definition/" + dictionaryItem.wordId)}
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
                <ArrowForward/>
            </div>
        </Button>
    );
}

export default WordListItem;