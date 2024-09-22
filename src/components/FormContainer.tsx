import {Button, Typography} from "@mui/material";
import FormContainerProps from "../component-props/form-container-props.ts";

function FormContainer({headerString, subHeaderString, children, btnText, formFooter}: FormContainerProps) {
    return (
        <div className={"container flex flex-col justify-center items-start w-full my-12 mx-auto"}>
            <Typography variant={"h4"} fontWeight={"bold"}>
                {headerString}
            </Typography>
            {subHeaderString && <Typography className={"mt-3"} variant={"body1"}>
                {subHeaderString}
            </Typography>}

            <form className={"mt-10 w-1/2"}>
                <div className={"mb-1 flex flex-col justify-between gap-6"}>
                    {children}
                </div>
                <Button variant={"contained"}
                        className={"mt-6 capitalize w-full text-lg"}>
                    {btnText}
                </Button>
            </form>
            {formFooter}
        </div>
    );
}

export default FormContainer;