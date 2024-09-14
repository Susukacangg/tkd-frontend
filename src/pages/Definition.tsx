import Header from "../components/Header.tsx";
import {Typography} from "@material-tailwind/react";
import TranslateItem from "../components/TranslateItem.tsx";
import UsageExampleItem from "../components/UsageExampleItem.tsx";

function Definition() {

    return(
        <>
            <Header/>
            <div className={"flex flex-col gap-8 w-3/4 mx-auto my-10"}>
                {/*WORD*/}
                <Typography variant={"h1"}>
                    tokou
                </Typography>

                {/*TRANSLATION*/}
                <div className={"flex flex-col gap-4"}>
                    <Typography variant={"h3"}>
                        Translation
                    </Typography>
                    <TranslateItem translation={"we"} wordCategory={"Pronoun"}/>
                </div>

                {/*EXAMPLES*/}
                <div className={"flex flex-col gap-4"}>
                    <Typography variant={"h3"}>
                        Usage examples
                    </Typography>
                    <UsageExampleItem kadazanSentence={"Kanou tokou mugad doiho"} englishSentence={"Come on, let's go there"}/>
                </div>
            </div>
        </>
    );
}

export default Definition;