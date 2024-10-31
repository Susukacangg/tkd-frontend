import Header from "../components/Header.tsx";
import {useEffect, useState} from "react";
import WordList from "../components/WordList.tsx";
import {useSearchParams} from "react-router-dom";
import DictionaryService from "../service/dictionary-service.ts";
import {CircularProgress, Pagination, Typography} from "@mui/material";
import Word from "../dto/Word.ts";
import CenteredContainer from "../components/CenteredContainer.tsx";

function SearchResult() {
    const [words, setWords] = useState<Word[]>([]);
    const [numPages, setNumPages] = useState(0);
    const [pageNum, setPageNum] = useState(1);
    const [searchParams] = useSearchParams();
    const searchString = searchParams.get("searchString");

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const controller = new AbortController();
        setIsLoading(true);
        (async () => {
            if (searchString !== undefined) {
                try {
                    const response: any = await DictionaryService.searchWord(searchString as string, pageNum, controller);
                    if(response !== "") {
                        setWords(response.content);
                        setNumPages(response.totalPages);
                    } else {
                        setWords([]);
                        setNumPages(0);
                    }
                } catch (error: any) {
                    if(error.name !== 'CanceledError')
                        console.error(error);
                }
                setIsLoading(false);
            }
        })();

        return () => {
            controller.abort();
            setIsLoading(false);
        }
    }, [searchString, pageNum])

    return (
        <>
            <Header/>
            <CenteredContainer>
                {!isLoading ? (
                    words.length > 0? (
                        <>
                            <WordList words={words}/>
                        </>
                    ): (
                        <Typography variant={"h3"}>
                            No results found for "{searchString}"
                        </Typography>
                    )
                ): <CircularProgress size={69}/>}
                <div className="flex justify-center">
                    <Pagination count={numPages}
                                size={"large"}
                                color={"primary"}
                                onChange={(_, page) => setPageNum(page)}/>
                </div>
            </CenteredContainer>
        </>
    );
}

export default SearchResult;