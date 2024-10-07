import Header from "../components/common/Header.tsx";
import {Typography} from "@mui/material";
import TranslateItem from "../components/definition/TranslateItem.tsx";
import UsageExampleItem from "../components/definition/UsageExampleItem.tsx";

function Definition() {

    return(
        <>
            <Header enableContributeBtn={false}/>
            <div className={"flex flex-col gap-10 w-3/4 mx-auto my-10"}>
                {/*WORD*/}
                <Typography variant={"h3"}>
                    tokou
                </Typography>

                {/*TRANSLATION*/}
                <div className={"flex flex-col gap-4"}>
                    <Typography variant={"h5"}>
                        Translation
                    </Typography>
                    <TranslateItem translation={"we"}/>
                </div>

                {/*EXAMPLES*/}
                <div className={"flex flex-col gap-4"}>
                    <Typography variant={"h5"}>
                        Usage examples
                    </Typography>
                    <UsageExampleItem kadazanSentence={"Kanou tokou mugad doiho"} englishSentence={"Come on, let's go there"}/>
                </div>
            </div>
        </>
    );
}

export default Definition;