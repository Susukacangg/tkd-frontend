import {Typography} from "@mui/material";
import {TranslateItemProps} from "../component-props/translate-item-props.ts";
import {GTranslate} from "@mui/icons-material";

function TranslateItem({translation}: TranslateItemProps) {
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