import {Autocomplete, CircularProgress, InputAdornment, TextField} from "@mui/material";
import {useNavigate} from "react-router-dom";
import React, {ReactNode, useEffect, useState} from "react";
import DictionaryService from "../service/dictionary-service.ts";

function SearchBar({children, classString}: {children: ReactNode, classString?: string}) {
    const navigate = useNavigate();
    const [inputValue, setInputValue] = useState<string>("");
    const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
    const [isDropdownLoading, setIsDropdownLoading] = useState<boolean>(false);
    const [suggestedWords, setSuggestedWords] = useState<string[]>([]);
    const [isTyping, setIsTyping] = useState(false);
    const [highlightedOption, setHighlightedOption] = useState<string | null>(null);

    const startSearch = (searchStr: string) => {
        if(searchStr.trim().length > 0)
            navigate(`/search/${searchStr}`);
    }

    const childrenWithClickHandler = React.Children.map(children, child => {
        if(React.isValidElement(child)) {
            return React.cloneElement(child, {
                // @ts-ignore
                onClick: () => startSearch(inputValue)
            })
        }
        return child;
    });

    const suggestWord = async (searchStr: string) => {
        try {
            const response = await DictionaryService.suggestWord(searchStr);
            setSuggestedWords(response? (response as string[]) : [`Add "${searchStr}" to the dictionary...`]);
        } catch (error: any) {
            if(error.name !== 'CanceledError')
                console.log(error);
        }
    };

    const handleDropdownClose = () => {
        setSuggestedWords([]);
    }

    const handleEnterKeyDown = (e: any) => {
        if(e.key === "Enter" && !highlightedOption) {
            e.preventDefault();
            e.target.blur();
            startSearch(inputValue);
        }
    }

    const handleChange = async (e: any) => {
        const searchStr = e.target.value;
        setInputValue(searchStr.trim());
        setIsTyping(true);

        // Exit early if input is empty to avoid unnecessary API calls
        if (searchStr.trim().length < 1) {
            setSuggestedWords([])
            setIsTyping(false);
        }
    }

    const handleSelect = (value: string | null) => {
        setInputValue((value as string).trim());
        if (value === `Add "${inputValue}" to the dictionary...`)
            navigate(`/contribute?word=${inputValue}`);
    }

    const handleHighlightChange = (value: string | null) => {
        setHighlightedOption(value);
    }

    useEffect(() => {
        if(isTyping) {
            const timeoutId = setTimeout(async () => {
                setIsTyping(false);

                setIsDropdownLoading(true);
                await suggestWord(inputValue);
                setIsDropdownLoading(false);
            }, 325);

            return () => clearTimeout(timeoutId);
        }
    }, [inputValue, isTyping]);

    useEffect(() => {
        setIsDropdownOpen(suggestedWords.length > 0);
    }, [suggestedWords]);

    return (
        <>
            <Autocomplete disableClearable
                          freeSolo
                          options={suggestedWords}
                          open={isDropdownOpen}
                          loading={isDropdownLoading || isTyping}
                          fullWidth={true}
                          value={inputValue}
                          onClose={handleDropdownClose}
                          onBlur={handleDropdownClose}
                          onHighlightChange={(_, option) => handleHighlightChange(option)}
                          onChange={(_, value, __) => handleSelect(value)}
                          filterOptions={x => x}
                          renderInput={(params) => (
                              <TextField {...params}
                                         placeholder={"Search"}
                                         color={"primary"}
                                         type={"text"}
                                         autoComplete={"off"}
                                         onChange={(e: any) => handleChange(e)}
                                         onKeyDown={(e) => handleEnterKeyDown(e)}
                                         slotProps={{
                                             input: {
                                                 ...params.InputProps,
                                                 endAdornment: (
                                                     <InputAdornment position={"end"}>
                                                         {isDropdownLoading || isTyping? <CircularProgress color="primary" size={28}/> : null}
                                                         {childrenWithClickHandler}
                                                     </InputAdornment>
                                                 ),
                                                 className: `bg-white ${classString}`
                                             },
                                         }}/>
                          )}/>
        </>
    );
}

export default SearchBar;