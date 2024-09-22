import {InputAdornment, TextField} from "@mui/material";
import {Search} from "@mui/icons-material";

function SearchBar() {

    return (
        <>
            <TextField type={"text"}
                       placeholder={"Search"}
                       color={"primary"}
                       className={"w-full"}
                       slotProps={{
                           input: {
                               endAdornment: (
                                   <InputAdornment position={"end"}>
                                       <Search/>
                                   </InputAdornment>
                               ),
                               className: "text-sm"
                           },
                       }}/>
        </>
    );
}

export default SearchBar;