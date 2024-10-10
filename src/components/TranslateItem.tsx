import {Typography} from "@mui/material";
import {GTranslate} from "@mui/icons-material";

function TranslateItem({translation}: {translation: string}) {
    return (
        <div className={"flex flex-row justify-between items-center"}>
            <div className={"w-fit flex flex-row items-center"}>
                <GTranslate fontSize={"large"}
                            className={"mr-4 bg-gray-200 p-3 rounded-md"}/>
                <Typography variant="h6" fontWeight={"bold"}>
                    {translation}
                </Typography>
            </div>
        </div>
    );
}

export default TranslateItem;