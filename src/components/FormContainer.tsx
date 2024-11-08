import {Typography} from "@mui/material";
import FormContainerProps from "../component-props/form-container-props.ts";

function FormContainer({headerString, subHeaderString, children, formFooter}: FormContainerProps) {
    return (
        <div className={"container flex flex-col justify-center items-start w-full sm:mt-24 xl:mt-10 mb-14 mx-auto"}>
            <Typography variant={"h4"} fontWeight={"bold"}
                        className={"sm:text-6xl xl:text-4xl"}>
                {headerString}
            </Typography>
            {subHeaderString && <Typography className={"sm:mt-8 xl:mt-3 sm:text-2xl xl:text-md"} variant={"body1"}>
                {subHeaderString}
            </Typography>}

            {children}
            {formFooter}
        </div>
    );
}

export default FormContainer;