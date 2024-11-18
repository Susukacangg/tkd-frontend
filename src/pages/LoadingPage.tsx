import {CircularProgress, Typography} from "@mui/material";

function LoadingPage({loadingText}: {loadingText: string}) {
    return (
        <div className="flex justify-center items-center h-screen w-screen">
            <div className="flex-col gap-10 justify-items-center">
                <CircularProgress size={69} className={"mb-14"}/>
                <Typography className={"lg:text-3xl xl:text-base"}>
                    {loadingText}
                </Typography>
            </div>
        </div>
    );
}

export default LoadingPage;