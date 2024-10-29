import {Pagination, Typography} from "@mui/material";
import Header from "../components/Header.tsx";
import WordList from "../components/WordList.tsx";
import {useEffect, useState} from "react";
import DictionaryService from "../service/dictionary-service.ts";
import DictionaryItem from "../dto/DictionaryItem.ts";

function MyContributions() {
    const [dictionaryItems, setDictionaryItems] = useState<DictionaryItem[]>([]);
    const [numPages, setNumPages] = useState(1);
    const [pageNum, setPageNum] = useState(1);

    useEffect(() => {
        const controller = new AbortController();

        (async () => {
            try {
                const response = await DictionaryService.getUserContributions(pageNum, controller);
                setDictionaryItems(response.content);
                setNumPages(response.totalPages);
            } catch (error: any) {
                if(error.name !== 'CanceledError')
                    console.log(error.message);
            }
        })();

        return () => controller.abort();
    }, [pageNum])

    return (
        <>
            <Header enableSearchBar={true} enableContributeBtn={true} enableHomeOnly={true}/>
            <div className={"flex flex-col gap-6 justify-center mx-auto mt-20 mb-12 w-3/5"}>
                <Typography variant={"h3"} className={"mb-8"}>
                    My Contributions
                </Typography>
                {dictionaryItems? (
                    <>
                        <WordList dictionaryItems={dictionaryItems}/>
                        <div className="flex justify-center">
                            <Pagination count={numPages}
                                        onChange={(_, page) => setPageNum(page)}/>
                        </div>
                    </>
                ): (
                    <Typography variant={"h6"}>
                        You haven't contributed any words yet
                    </Typography>
                )}
            </div>
        </>
    );
}

export default MyContributions;
