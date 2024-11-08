import {Typography} from "@mui/material";
import {UsageExampleProps} from "../component-props/usage-example-props.ts";
import {FormatQuote} from "@mui/icons-material";

function UsageExampleItem({kadazanSentence, originalSentence}: UsageExampleProps) {
    return (
        <div className={"flex flex-row mr-4 items-center mt-1"}>
            <FormatQuote className={"mr-4 bg-gray-200 p-1 rounded-md sm:text-6xl xl:text-3xl"}/>

            {/*sentence example*/}
            <div className={"flex flex-col"}>
                {/*KADAZAN EXAMPLE*/}
                <Typography variant={"h6"} fontWeight={"bold"}
                            className={"sm:text-4xl xl:text-xl sm:mb-2 xl:mb-0"}>
                    {kadazanSentence}
                </Typography>

                {/*ORIGINAL EXAMPLE*/}
                <Typography variant={"subtitle1"}
                            className={"sm:text-3xl xl:text-[16px]"}>
                    {originalSentence}
                </Typography>
            </div>
        </div>
    );
}

export default UsageExampleItem;