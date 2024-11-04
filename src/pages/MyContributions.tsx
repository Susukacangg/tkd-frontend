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

    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        setIsLoading(true);
        const controller = new AbortController();
        let isMounted = true;

        (async () => {
            try {
                const response = await DictionaryService.getUserContributions(pageNum, controller);
                if(isMounted) {
                    setWords(response.content);
                    setNumPages(response.totalPages);
                }
            } catch (error: any) {
                if(error.name !== 'CanceledError' && isMounted)
                    console.log(error.message);
            } finally {
                if(isMounted)
                    setIsLoading(false)
            }
        })();

        return () => {
            isMounted = false;
            controller.abort();
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
