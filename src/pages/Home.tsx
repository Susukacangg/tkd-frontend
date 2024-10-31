import Header from "../components/Header.tsx";
import HeroBanner from "../components/HeroBanner.tsx";
import WordList from "../components/WordList.tsx";
import {CircularProgress, Pagination} from "@mui/material";
import {useEffect, useState} from "react";
import {toast} from "sonner";
import {TOAST_CUSTOM_CLOSE_BTN} from "../common/toast-custom-close-btn.tsx";
import DictionaryService from "../service/dictionary-service.ts";
import Word from "../dto/Word.ts";

function Home() {
    const [numPages, setNumPages] = useState<number>(0);
    const [words, setWords] = useState<Word[]>([]);
    const [pagedWords, setPagedWords] = useState<Word[]>([]);
    const numResultsDisplay: number = 10;

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const controller = new AbortController();

        setIsLoading(true);
        (async() => {
            try {
                await new Promise(resolve => setTimeout(resolve, 1000));
                const response: Word[] = await DictionaryService.getRandomWords(controller);
                setNumPages(Math.ceil(response.length / numResultsDisplay));
                setWords(response);
                setPagedWords(response.slice(0, 10));
            } catch (error: any) {
                if(error.name !== 'CanceledError')
                    toast.error(error.message, TOAST_CUSTOM_CLOSE_BTN);
            }
            setIsLoading(false);
        })()

        return () => controller.abort();
    }, [])

    return (
        <>
            <Header enableSearchBar={false}/>
            <div className={"flex flex-col gap-6 justify-center items-center mx-auto my-12 w-3/5"}>
                <HeroBanner/>
                {!isLoading ? (
                    <>
                        <WordList words={pagedWords}/>
                        <div className="flex justify-center">
                            <Pagination count={numPages}
                                        size={"large"}
                                        color={"primary"}
                                        sx={{}}
                                        onChange={(_, page) =>
                                            setPagedWords(words.slice((page - 1) * numResultsDisplay, (page * numResultsDisplay)))}/>
                        </div>
                    </>
                    ) : <CircularProgress size={69}/>}
            </div>
        </>
    );
}

export default Home
