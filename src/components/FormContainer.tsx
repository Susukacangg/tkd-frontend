import {Typography} from "@mui/material";
import FormContainerProps from "../component-props/form-container-props.ts";

function FormContainer({headerString, subHeaderString, children, formFooter}: FormContainerProps) {
    return (
        <div className={"container flex flex-col justify-center items-start xxs:w-11/12 xl:w-full xxs:mt-7 lg:mt-24 xl:mt-10 mb-14 mx-auto"}>
            <Typography variant={"h4"} fontWeight={"bold"}
                        className={"xxs:text-2xl lg:text-6xl xl:text-4xl"}>
                {headerString}
            </Typography>
            {subHeaderString && <Typography className={"lg:mt-8 xl:mt-3 xxs:text-[12px] lg:text-2xl xl:text-md"} variant={"body1"}>
                {subHeaderString}
            </Typography>}

            {children}
            {formFooter}
        </div>
    );
}

export default FormContainer;