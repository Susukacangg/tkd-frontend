import {Typography} from "@mui/material";
import {GTranslate} from "@mui/icons-material";

function TranslateItem({translation}: {translation: string}) {
    return (
        <div className={"flex flex-row justify-between items-center mt-1"}>
            <div className={"w-fit flex flex-row items-center"}>
                <GTranslate className={"mr-6 bg-gray-200 sm:p-2 xl:p-1 rounded-md sm:text-6xl xl:text-3xl"}/>
                <Typography variant="h6" fontWeight={"bold"}
                            className={"sm:text-5xl xl:text-xl"}>
                    {translation}
                </Typography>
            </div>
        </div>
    );
}

export default TranslateItem;