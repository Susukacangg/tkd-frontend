import Header from "../components/Header.tsx";
import {useEffect, useState} from "react";
import DictionaryItem from "../dto/DictionaryItem.ts";
import WordList from "../components/WordList.tsx";
import {useParams} from "react-router-dom";
import DictionaryService from "../service/dictionary-service.ts";
import {Pagination} from "@mui/material";

function SearchResult() {
    const [dictionaryItems, setDictionaryItems] = useState<DictionaryItem[]>([]);
    const [numPages, setNumPages] = useState(1);
    const {searchString} = useParams();

    useEffect(() => {
        const controller = new AbortController();
        (async () => {
            if (searchString !== undefined) {
                try {
                    const response: any = await DictionaryService.searchWord(searchString, 1, controller);
                    console.log(response);
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
            <div className={"flex flex-col gap-6 justify-center mx-auto my-12 w-3/5"}>
                <WordList dictionaryItems={dictionaryItems}/>
                <div className="flex justify-center">
                    <Pagination count={numPages}/>
                </div>
            </div>
        </>
    );
}

export default SearchResult;