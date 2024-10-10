import {ChangeEventHandler} from "react";

interface FormInputProps {
    type: string;
    name?: string;
    placeholder?: string;
    isError?: boolean;
    onChange?: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
}

export default FormInputProps;