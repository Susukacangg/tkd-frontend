import {TextField} from "@mui/material";
import FormInputProps from "../component-props/form-input-props.ts";

function FormInput({type, placeholder = "", isError = false}: FormInputProps) {
    return(
        <>
            <TextField placeholder={placeholder}
                       type={type}
                       color={"primary"}
                       error={isError}/>
        </>
    );
}

export default FormInput;