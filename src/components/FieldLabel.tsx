import {Typography} from "@material-tailwind/react";
import FieldLabelProps from "../component-props/field-label-props.ts";

function FieldLabel({title}: FieldLabelProps) {
    return(
        <Typography variant={"h5"} className={"-mb-3"}>
            {title}
        </Typography>
    );
}

export default FieldLabel;