import {Typography} from "@material-tailwind/react";
import {TranslateItemProps} from "../component-props/translate-item-props.ts";

function TranslateItem({translation, wordCategory}: TranslateItemProps) {
    return (
        <div className={"flex flex-row justify-between"}>
            <Typography variant="h5">
                {translation}
            </Typography>
            <Typography variant="h5">
                {wordCategory}
            </Typography>
        </div>
    );
}

export default TranslateItem;