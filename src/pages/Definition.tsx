import Header from "../components/Header.tsx";
import {Typography} from "@mui/material";
import TranslateItem from "../components/TranslateItem.tsx";
import UsageExampleItem from "../components/UsageExampleItem.tsx";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import DictionaryService from "../service/dictionary-service.ts";
import {toast} from "sonner";
import {TOAST_CUSTOM_CLOSE_BTN} from "../common/toast-custom-close-btn.tsx";
import DictionaryItem from "../dto/DictionaryItem.ts";

function Definition() {
    const {wordId} = useParams();
    const navigate = useNavigate()
    const [currentWord, setCurrentWord] = useState<DictionaryItem>({translations: "", usageExamples: "", word: ""});

    useEffect(() => {
        const controller = new AbortController();

        (async () => {
            if (wordId != undefined) {
                try {
                    const response: DictionaryItem = await DictionaryService.findWord(parseInt(wordId), controller);
                    console.log(response);
                    setCurrentWord(response);
                } catch (error: any) {
                    // do nothing
                    // todo: navigate to 404 not found page
                    if (error.status === 404)
                        toast.error("Word not found", TOAST_CUSTOM_CLOSE_BTN);
                }
            } else {
                // todo: navigate to 404 not found page
                toast.error("Invalid path", TOAST_CUSTOM_CLOSE_BTN);
                navigate("/home");
            }
        })();

        return () => controller.abort();
    }, []);

    return(
        <>
            <Header enableContributeBtn={false}/>
            <div className={"flex flex-col gap-10 w-3/4 mx-auto my-10"}>
                {/*WORD*/}
                <Typography variant={"h3"}>
                    {currentWord.word}
                </Typography>

                {/*TRANSLATION*/}
                <div className={"flex flex-col gap-4"}>
                    <Typography variant={"h5"}>
                        Translation
                    </Typography>
                    {currentWord.translations.split(";").map((value) => {
                        return (
                            <TranslateItem key={`translation-${value}`}
                                           translation={value}/>
                        );
                    })}
                </div>

                {/*EXAMPLES*/}
                <div className={"flex flex-col gap-4"}>
                    <Typography variant={"h5"}>
                        Usage examples
                    </Typography>
                    {currentWord.usageExamples.split(";").map((value, index) => {
                        const exampleArr = value.split("|");
                        return (
                            <UsageExampleItem key={`usage-example-${index}`}
                                              kadazanSentence={exampleArr[0]}
                                              englishSentence={exampleArr[1]}/>
                        );
                    })}
                </div>
            </div>
        </>
    );
}

export default Definition;