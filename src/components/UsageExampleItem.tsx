import {Typography} from "@material-tailwind/react";
import {UsageExampleProps} from "../component-props/usage-example-props.ts";

function UsageExampleItem({kadazanSentence, englishSentence}: UsageExampleProps) {
    return (
        <div className={"flex flex-col"}>
            {/*KADAZAN EXAMPLE*/}
            <Typography variant={"h5"}>
                {kadazanSentence}
            </Typography>

            {/*ENGLISH EXAMPLE*/}
            <Typography variant={"paragraph"}>
                {englishSentence}
            </Typography>
        </div>
    );
}

export default UsageExampleItem;