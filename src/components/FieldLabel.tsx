import {Typography} from "@mui/material";
import FieldLabelProps from "../component-props/field-label-props.ts";

function FieldLabel({title}: FieldLabelProps) {
    return(
        <Typography variant={"h6"} className={"-mb-3"}>
            {title}
        </Typography>
    );
}

export default FieldLabel;