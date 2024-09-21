import {InputAdornment, TextField} from "@mui/material";
import {Search} from "@mui/icons-material";

function SearchBar() {

    return (
        <>
            <TextField type={"text"} placeholder={"Search"}
                       color={"primary"}
                       slotProps={{
                           input: {
                               endAdornment: (
                                   <InputAdornment position={"end"}>
                                       <Search/>
                                   </InputAdornment>
                               )
                           },
                       }}/>
        </>
    );
}

export default SearchBar;