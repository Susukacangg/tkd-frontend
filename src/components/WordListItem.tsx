import {useNavigate} from "react-router-dom";
import {Card, Typography} from "@mui/material";
import Word from "../dto/Word.ts";
import Translation from "../dto/Translation.ts";


function WordListItem({word}: {word: Word}) {
    const navigate = useNavigate();

    return (
        <Card className={`w-full box-border py-8 px-6 rounded-lg bg-white hover:bg-gray-100 cursor-pointer normal-case`}
              onClick={() => navigate(`/definition/${word.wordId}`)}
              sx={{boxShadow: 5}}>
            <div className={"flex items-center justify-between w-full"}>
                <div className="flex flex-col items-start w-full">
                    <Typography variant={"h5"}
                                className={"xxs:text-lg lg:text-4xl xl:text-2xl"}>
                        {word.word}
                    </Typography>
                    <Typography variant={"h6"}
                                color={"textDisabled"}
                                className={"font-semibold xxs:text-base lg:text-2xl xl:text-xl"}>
                        {word.translations.map((value: Translation, index: number, array: Translation[]) => {
                            let translation = value.translation;
                            if (index !== array.length - 1)
                                translation += "; ";
                            return translation;
                        })}
                    </Typography>
                </div>
            </div>
        </Card>
    );
}

export default WordListItem;