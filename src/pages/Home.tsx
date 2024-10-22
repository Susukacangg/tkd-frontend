import Header from "../components/Header.tsx";
import HeroBanner from "../components/HeroBanner.tsx";
import WordList from "../components/WordList.tsx";
import {Pagination} from "@mui/material";
import {useEffect, useState} from "react";
import {toast} from "sonner";
import {TOAST_CUSTOM_CLOSE_BTN} from "../common/toast-custom-close-btn.tsx";
import DictionaryService from "../service/dictionary-service.ts";
import DictionaryItem from "../dto/DictionaryItem.ts";

function Home() {
    const [numPages, setNumPages] = useState<number>(1);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [dictionaryItems, setDictionaryItems] = useState<DictionaryItem[]>([]);

    useEffect(() => {
        const controller = new AbortController();

        (async() => {
            try {
                const response = await DictionaryService.getRandomWords(currentPage, controller);
                setNumPages(response.totalPages);
                setDictionaryItems(response.content);
                console.log(response);
            } catch (error: any) {
                if(error.name !== 'CanceledError')
                    toast.error(error.message, TOAST_CUSTOM_CLOSE_BTN);
            }
        })()

        return () => controller.abort();
    }, [currentPage])

    return (
    <>
        <Header enableSearchBar={false}/>
        <div className={"flex flex-col gap-6 justify-center mx-auto my-12 w-3/5"}>
            <HeroBanner/>
            <WordList dictionaryItems={dictionaryItems} />
            <div className="flex justify-center">
                <Pagination count={numPages}
                            size={"large"}
                            color={"primary"}
                            onChange={(_, page) => setCurrentPage(page)}/>
            </div>
        </div>
    </>
)
}

export default Home
