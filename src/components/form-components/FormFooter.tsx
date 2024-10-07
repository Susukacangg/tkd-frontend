import {NavLink} from "react-router-dom";
import {Typography} from "@mui/material";
import FormFooterProps from "../../component-props/form-footer-props.ts";

function FormFooter({text, linkText, linkRoute}: FormFooterProps) {
    return (
        <div className={"flex flex-row mt-6 w-fit"}>
            <Typography>
                {text} <NavLink to={linkRoute}
                                className={"text-blue-600 underline"}>{linkText}</NavLink>
            </Typography>
        </div>
    );
}

export default FormFooter;