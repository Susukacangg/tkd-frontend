import {Typography} from "@material-tailwind/react";
import {TranslateItemProps} from "../component-props/translate-item-props.ts";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

function TranslateItem({translation, wordCategory}: TranslateItemProps) {
    return (
        <div className={"flex flex-row justify-between items-center"}>
            <div className={"w-fit flex flex-row items-center"}>
                <FontAwesomeIcon icon={"language"} size={"2xl"}
                                 className={"mr-4 bg-gray-200 p-3 rounded-md"}/>
                <Typography variant="h5">
                    {translation}
                </Typography>
            </div>
            <Typography variant="h5">
                {wordCategory}
            </Typography>
        </div>
    );
}

export default TranslateItem;