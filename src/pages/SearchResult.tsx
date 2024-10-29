import Header from "../components/Header.tsx";
import {useEffect, useState} from "react";
import DictionaryItem from "../dto/DictionaryItem.ts";
import WordList from "../components/WordList.tsx";
import {useSearchParams} from "react-router-dom";
import DictionaryService from "../service/dictionary-service.ts";
import {Pagination, Typography} from "@mui/material";

function SearchResult() {
    const [dictionaryItems, setDictionaryItems] = useState<DictionaryItem[]>([]);
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
                        setDictionaryItems(response.content);
                        setNumPages(response.totalPages);
                    } else {
                        setDictionaryItems([]);
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
                {dictionaryItems.length > 0? (
                    <>
                        <WordList dictionaryItems={dictionaryItems}/>
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