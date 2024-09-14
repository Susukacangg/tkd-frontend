import {Typography} from "@material-tailwind/react";
import {UsageExampleProps} from "../component-props/usage-example-props.ts";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

function UsageExampleItem({kadazanSentence, englishSentence}: UsageExampleProps) {
    return (
        <div className={"flex flex-row mr-4 items-center"}>
            <FontAwesomeIcon icon={"quote-left"} size={"xl"}
                             className={"mr-4 bg-gray-200 p-3 rounded-md"}/>

            {/*sentence example*/}
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
        </div>
    );
}

export default UsageExampleItem;