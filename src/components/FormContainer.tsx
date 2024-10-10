import {Typography} from "@mui/material";
import FormContainerProps from "../component-props/form-container-props.ts";

function FormContainer({headerString, subHeaderString, children, formFooter}: FormContainerProps) {
    return (
        <div className={"container flex flex-col justify-center items-start w-full my-12 mx-auto"}>
            <Typography variant={"h4"} fontWeight={"bold"}>
                {headerString}
            </Typography>
            {subHeaderString && <Typography className={"mt-3"} variant={"body1"}>
                {subHeaderString}
            </Typography>}

            {children}
            {formFooter}
        </div>
    );
}

export default FormContainer;