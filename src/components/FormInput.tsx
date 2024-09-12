import {Input} from "@material-tailwind/react";
import {INPUT_STYLE} from "../component-const/input-props.ts";
import FormInputProps from "../component-props/form-input-props.ts";

function FormInput({type, placeholder}: FormInputProps) {
    return(
        <>
            <Input size={"lg"}
                   placeholder={placeholder}
                   type={type}
                   className={INPUT_STYLE}
                   labelProps={{
                       className: "hidden"
                   }}/>
        </>
    );
}

export default FormInput;