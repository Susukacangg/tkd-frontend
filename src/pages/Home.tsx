import Header from "../components/Header.tsx";
import HeroBanner from "../components/HeroBanner.tsx";
import WordList from "../components/WordList.tsx";
import {CircularProgress, Pagination, Typography} from "@mui/material";
import {useEffect, useState} from "react";
import {toast} from "sonner";
import {TOAST_CUSTOM_CLOSE_BTN} from "../common/toast-custom-close-btn.tsx";
import DictionaryService from "../service/dictionary-service.ts";
import Word from "../dto/Word.ts";
import CenteredContainer from "../components/CenteredContainer.tsx";

function Home() {
    const [numPages, setNumPages] = useState<number>(0);
    const [words, setWords] = useState<Word[]>([]);
    const [pagedWords, setPagedWords] = useState<Word[]>([]);
    const numResultsDisplay: number = 10;

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        const controller = new AbortController();
        let isMounted = true;

        (async() => {
            try {
                const response: Word[] = await DictionaryService.getRandomWords(controller);
                if(isMounted) {
                    setNumPages(Math.ceil(response.length / numResultsDisplay));
                    setWords(response);
                    setPagedWords(response.slice(0, 10));
                }
            } catch (error: any) {
                if(error.name !== 'CanceledError' && isMounted)
                    toast.error(error.message, TOAST_CUSTOM_CLOSE_BTN);
            } finally {
                if(isMounted)
                    setIsLoading(false);
            }
        })()

        return () => {
            isMounted = false;
            controller.abort();
        }
    }, [])

    return (
        <>
            <Header enableSearchBar={false}/>
            <CenteredContainer>
                <HeroBanner/>
                <Typography variant={"h3"} className={"mt-4"}>
                    Random Words
                </Typography>
                {!isLoading ? (
                    <>
                        <WordList words={pagedWords}/>
                    </>
                    ) : <CircularProgress size={69}/>}
                <div className="flex justify-center">
                    <Pagination count={numPages}
                                size={"large"}
                                color={"primary"}
                                onChange={(_, page) =>
                                    setPagedWords(words.slice((page - 1) * numResultsDisplay, (page * numResultsDisplay)))}/>
                </div>
            </CenteredContainer>
        </>
    );
}

export default Home
