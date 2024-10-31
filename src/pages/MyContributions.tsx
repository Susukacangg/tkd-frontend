import {CircularProgress, Pagination, Typography} from "@mui/material";
import Header from "../components/Header.tsx";
import WordList from "../components/WordList.tsx";
import {useEffect, useState} from "react";
import DictionaryService from "../service/dictionary-service.ts";
import Word from "../dto/Word.ts";
import CenteredContainer from "../components/CenteredContainer.tsx";

function MyContributions() {
    const [words, setWords] = useState<Word[]>([]);
    const [numPages, setNumPages] = useState(0);
    const [pageNum, setPageNum] = useState(1);

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const controller = new AbortController();

        setIsLoading(true);
        (async () => {
            try {
                const response = await DictionaryService.getUserContributions(pageNum, controller);
                setWords(response.content);
                setNumPages(response.totalPages);
            } catch (error: any) {
                if(error.name !== 'CanceledError')
                    console.log(error.message);
            }
            setIsLoading(false);
        })();

        return () => {
            controller.abort();
            setIsLoading(false);
        }
    }, [pageNum])

    return (
        <>
            <Header enableSearchBar={true} enableContributeBtn={true} enableHomeOnly={true}/>
            <CenteredContainer>
                <Typography variant={"h3"} className={"mb-8"}>
                    My Contributions
                </Typography>
                {!isLoading ?
                    words? (
                        <>
                            <WordList words={words}/>
                        </>
                    ): (
                        <Typography variant={"h6"}>
                            You haven't contributed any words yet
                        </Typography>
                    )
                : <CircularProgress size={69}/>}
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

export default MyContributions;
