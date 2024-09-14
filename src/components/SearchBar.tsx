import {Input} from "@material-tailwind/react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {INPUT_LABEL_PRIMARY} from "../component-const/input-props.ts";

function SearchBar() {

    return (
        <>
            <Input type={"text"} label={"Search"}
                   className={"focus:border-primary"}
                   icon={
                       <FontAwesomeIcon className={"text-gray-400 cursor-pointer"} icon="search" />
                   }
                   labelProps={{
                       className: INPUT_LABEL_PRIMARY
                   }}
            />
        </>
    );
}

export default SearchBar;