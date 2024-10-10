import {TextField} from "@mui/material";
import FormInputProps from "../component-props/form-input-props.ts";

function FormInput({type, name, placeholder = "", isError = false, onChange}: FormInputProps) {
    return(
        <>
            <TextField placeholder={placeholder}
                       name={name}
                       type={type}
                       color={"primary"}
                       error={isError}
                       onChange={onChange}/>
        </>
    );
}

export default FormInput;