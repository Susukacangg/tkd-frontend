import {CircularProgress, Typography} from "@mui/material";
import {useEffect} from "react";
import {useAuth} from "../contexts/AuthContext.tsx";

function LogoutPage() {
    const {logoutUser} = useAuth();

    useEffect(() => {
        const controller = new AbortController();

        (async () => {
            await logoutUser(controller);
        })();

        return () => controller.abort();
    }, []);

    return (
        <div className="flex justify-center items-center h-screen w-screen">
            <div className="flex-col gap-10 justify-items-center">
                <CircularProgress size={69} className={"mb-14"}/>
                <Typography>
                    Logging you out
                </Typography>
            </div>
        </div>
    );
}

export default LogoutPage;