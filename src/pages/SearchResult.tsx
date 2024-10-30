import Header from "../components/Header.tsx";
import {useEffect, useState} from "react";
import WordList from "../components/WordList.tsx";
import {useSearchParams} from "react-router-dom";
import DictionaryService from "../service/dictionary-service.ts";
import {Pagination, Typography} from "@mui/material";
import Word from "../dto/Word.ts";

function SearchResult() {
    const [words, setWords] = useState<Word[]>([]);
    const [numPages, setNumPages] = useState(1);
    const [searchParams] = useSearchParams();
    const searchString = searchParams.get("searchString");

    useEffect(() => {
        const controller = new AbortController();
        (async () => {
            if (searchString !== undefined) {
                try {
                    const response: any = await DictionaryService.searchWord(searchString as string, 1, controller);
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
            }
        })();

        return () => controller.abort();
    }, [searchString])

    return (
        <>
            <Header/>
            <div className={"flex flex-col gap-6 justify-center mx-auto mt-20 mb-12 w-3/5"}>
                {words.length > 0? (
                    <>
                        <WordList words={words}/>
                        <div className="flex justify-center">
                            <Pagination count={numPages}/>
                        </div>
                    </>
                ): (
                    <Typography variant={"h3"}>
                        No results found for "{searchString}"
                    </Typography>
                )}
            </div>
        </>
    );
}

export default SearchResult;