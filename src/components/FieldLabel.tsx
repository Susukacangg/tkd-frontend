import {Typography} from "@mui/material";

function FieldLabel({title}: {title: string}) {
    return(
        <Typography variant={"h6"} className={"-mb-3"}>
            {title}
        </Typography>
    );
}

export default FieldLabel;