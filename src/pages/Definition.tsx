import Header from "../components/Header.tsx";
import {Button, Divider, IconButton, Tooltip, Typography} from "@mui/material";
import TranslateItem from "../components/TranslateItem.tsx";
import UsageExampleItem from "../components/UsageExampleItem.tsx";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import DictionaryService from "../service/dictionary-service.ts";
import {toast} from "sonner";
import {TOAST_CUSTOM_CLOSE_BTN} from "../common/toast-custom-close-btn.tsx";
import {Report} from "@mui/icons-material";
import {useAuth} from "../contexts/AuthContext.tsx";
import Word from "../dto/Word.ts";

function Definition() {
    const {wordId} = useParams();
    const navigate = useNavigate()
    const [currentWord, setCurrentWord] = useState<Word | null>(null);
    const {currentUser} = useAuth();
    const isUsersWord = currentUser?.username === currentWord?.username;

    useEffect(() => {
        const controller = new AbortController();

        (async () => {
            if (wordId != undefined) {
                try {
                    const response: Word = await DictionaryService.getWord(parseInt(wordId), controller);
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
            <Header/>
            <div className={"flex flex-col gap-10 w-3/4 mx-auto mt-16 mb-10"}>
                {/*WORD*/}
                <div className="flex justify-between items-end">
                    <Typography variant={"h2"}>
                        {currentWord?.word}
                    </Typography>
                    <Typography variant={"body1"}>
                        contributed by {currentWord?.username}
                    </Typography>
                </div>

                <Divider/>

                {/*TRANSLATION*/}
                <div className={"flex flex-col gap-4 my-4"}>
                    <Typography variant={"h5"}>
                        Translation
                    </Typography>
                    {currentWord?.translations.map((translation) => {
                        return (
                            <TranslateItem key={`translation-${translation.translation}`}
                                           translation={translation.translation}/>
                        );
                    })}
                </div>

                {/*EXAMPLES*/}
                <div className={"flex flex-col gap-4"}>
                    <Typography variant={"h5"}>
                        Usage examples
                    </Typography>
                    {currentWord?.usageExamples.map((usageExample, index) => {
                        return (
                            <UsageExampleItem key={`usage-example-${index}`}
                                              kadazanSentence={usageExample.example}
                                              originalSentence={usageExample.exampleTranslation}/>
                        );
                    })}
                </div>

                <div className="flex justify-between items-center mt-16">
                    <div className="flex items-center gap-6">
                        {isUsersWord? (
                            <>
                                <Button variant={"contained"}
                                        color={"primary"}
                                        className={"px-6 py-2"}>
                                    Edit
                                </Button>
                                <Button variant={"contained"}
                                        color={"error"}
                                        className={"px-6 py-2"}>
                                    Delete
                                </Button>
                            </>): null}
                    </div>
                    <Tooltip title={"Report this contribution"}>
                        <IconButton color={"error"}
                                    size={"large"}>
                            <Report fontSize={"large"}/>
                        </IconButton>
                    </Tooltip>
                </div>

            </div>
        </>
    );
}

export default Definition;