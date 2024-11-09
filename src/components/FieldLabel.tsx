import {Typography} from "@mui/material";

function FieldLabel({title}: {title: string}) {
    return(
        <Typography variant={"h6"} className={"-mb-3 xxs:text-lg lg:text-5xl xl:text-xl"}>
            {title}
        </Typography>
    );
}

export default FieldLabel;