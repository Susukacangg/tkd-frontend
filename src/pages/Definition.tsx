import Header from "../components/Header.tsx";
import {Divider, Skeleton, Typography} from "@mui/material";
import TranslateItem from "../components/TranslateItem.tsx";
import UsageExampleItem from "../components/UsageExampleItem.tsx";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import DictionaryService from "../service/dictionary-service.ts";
import {toast} from "sonner";
import {TOAST_CUSTOM_CLOSE_BTN} from "../common/toast-custom-close-btn.tsx";
import {useAuth} from "../contexts/AuthContext.tsx";
import Word from "../dto/Word.ts";
import CommentsList from "../components/CommentsList.tsx";
import DefinitionFooter from "../components/DefinitionFooter.tsx";

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
                <div className={"flex flex-col xxs:gap-6 lg:gap-10 w-3/4 mx-auto xxs:mt-10 lg:mt-32 xl:mt-16 mb-10"}>
                    {/*WORD*/}
                    <div className="flex justify-between xxs:gap-4 lg:gap-8 xl:gap-0 xl:items-end xxs:flex-col xl:flex-row">
                        <Typography variant={"h2"}
                                    className={"xxs:text-4xl lg:text-8xl xl:text-6xl"}>
                            {currentWord?.word}
                        </Typography>
                        <Typography variant={"body1"}
                                    className={"xxs:text-[12px] lg:text-2xl xl:text-[16px]"}>
                            contributed by {currentWord?.username}
                        </Typography>
                    </div>

                    <Divider/>

                    {/*TRANSLATION*/}
                    <div className={"flex flex-col gap-4 xxs:mt-0 lg:mb-20 lg:mt-12 xl:my-4"}>
                        <Typography variant={"h5"}
                                    className={"xxs:text-lg lg:text-6xl xl:text-2xl lg:mb-4 xl:mb-0"}>
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
                        <Typography variant={"h5"}
                                    className={"xxs:text-lg lg:text-6xl xl:text-2xl lg:mb-4 xl:mb-0"}>
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

                    <DefinitionFooter isUsersWord={isUsersWord}
                                      isUserAdmin={isUserAdmin}
                                      isDeleting={isDeleting}
                                      currentWord={currentWord}
                                      handleDeleteClick={handleDeleteClick}/>

                    <CommentsList/>
                </div>
            ): <DefinitionSkeleton/>}

        </>
    );
}

export default Definition;