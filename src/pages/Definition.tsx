import Header from "../components/Header.tsx";
import {Button, CircularProgress, Divider, IconButton, Skeleton, Tooltip, Typography} from "@mui/material";
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

const DefinitionSkeleton = () => {
    return (
        <div className={"flex flex-col gap-10 w-3/4 mx-auto mt-16 mb-10"}>
            <div className="flex justify-between items-end">
                <Skeleton width={"35%"} height={90}/>
                <Skeleton width={"10%"}/>
            </div>

            <Divider/>

            <div className={"flex flex-col gap-4 my-4"}>
                <Skeleton width={"15%"} height={50}/>
                <Skeleton width={"25%"}/>
                <Skeleton width={"25%"}/>
            </div>
            <div className={"flex flex-col gap-4"}>
                <Skeleton width={"18%"} height={50}/>
                <Skeleton width={"25%"}/>
                <Skeleton width={"20%"}/>
            </div>
        </div>
    );
}

function Definition() {
    const {wordId} = useParams();
    const navigate = useNavigate()
    const [currentWord, setCurrentWord] = useState<Word | null>(null);
    const {currentUser, isUserAdmin} = useAuth();
    const isUsersWord = currentUser?.username === currentWord?.username;

    const [isLoading, setIsLoading] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        const controller = new AbortController();
        let isMounted = true;

        (async () => {
            if (wordId != undefined) {
                try {
                    const response: Word = await DictionaryService.getWord(parseInt(wordId), controller);
                    if(isMounted)
                        setCurrentWord(response);
                } catch (error: any) {
                    if (error.status === 404 && isMounted)
                        navigate("/not-found");
                } finally {
                    if(isMounted)
                        setIsLoading(false);
                }
            }
        })();

        return () => {
            isMounted = false;
            controller.abort();
        }
    }, []);

    const handleDeleteClick = async () => {
        setIsDeleting(true);
        try {
            await DictionaryService.deleteWord(parseInt(wordId as string));
            toast.success("Deleted word", TOAST_CUSTOM_CLOSE_BTN);
            navigate("/my-contributions");
        } catch (error: any) {
            toast.error("Failed to delete word", TOAST_CUSTOM_CLOSE_BTN);
        } finally {
            setIsDeleting(false);
        }
    }

    return(
        <>
            <Header/>
            {!isLoading ? (
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
                            Translation/Definition
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
                            {isUsersWord || isUserAdmin? (
                                <>
                                    <Button variant={"contained"}
                                            color={"primary"}
                                            className={"px-6 py-2"}
                                            disabled={isDeleting}
                                            onClick={() => navigate(`/edit/${currentWord?.wordId}`, {
                                                state: currentWord
                                            })}>
                                        Edit
                                    </Button>
                                    <Button variant={"contained"}
                                            color={"error"}
                                            className={"px-6 py-2"}
                                            disabled={isDeleting}
                                            onClick={handleDeleteClick}>
                                        {isDeleting ? <CircularProgress size={25} color={"error"}/> : "Delete"}
                                    </Button>
                                </>): null}
                        </div>
                        <Tooltip title={"Report this contribution"}>
                            <IconButton color={"error"}
                                        size={"large"}
                                        onClick={() => navigate(`/report/${currentWord?.wordId}`, {
                                            state: currentWord
                                        })}>
                                <Report fontSize={"large"}/>
                            </IconButton>
                        </Tooltip>
                    </div>
                </div>
            ): <DefinitionSkeleton/>}

        </>
    );
}

export default Definition;