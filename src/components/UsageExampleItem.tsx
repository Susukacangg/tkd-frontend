import {Typography} from "@mui/material";
import {UsageExampleProps} from "../component-props/usage-example-props.ts";
import {FormatQuote} from "@mui/icons-material";

function UsageExampleItem({kadazanSentence, originalSentence}: UsageExampleProps) {
    return (
        <div className={"flex flex-row mr-4 items-center mt-1"}>
            <FormatQuote fontSize={"large"}
                         className={"mr-4 bg-gray-200 p-1 rounded-md"}/>

            {/*sentence example*/}
            <div className={"flex flex-col"}>
                {/*KADAZAN EXAMPLE*/}
                <Typography variant={"h6"} fontWeight={"bold"}>
                    {kadazanSentence}
                </Typography>

                {/*ORIGINAL EXAMPLE*/}
                <Typography variant={"subtitle1"}>
                    {originalSentence}
                </Typography>
            </div>
        </div>
    );
}

export default UsageExampleItem;