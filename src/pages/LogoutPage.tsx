import {CircularProgress, Typography} from "@mui/material";
import {useEffect} from "react";
import {useAuth} from "../contexts/AuthContext.tsx";
import IamService from "../service/iam-service.ts";
import {toast} from "sonner";
import {TOAST_CUSTOM_CLOSE_BTN} from "../common/toast-custom-close-btn.tsx";
import {useNavigate} from "react-router-dom";

function LogoutPage() {
    const {logoutUser} = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            try {
                const logoutMessage: string = await IamService.logout();

                toast.success(logoutMessage, TOAST_CUSTOM_CLOSE_BTN);
                logoutUser();
                navigate("/home", {replace: true});
            } catch (error: any) {
                toast.error(error.message, TOAST_CUSTOM_CLOSE_BTN);
                navigate("/home", {replace: true});
            }
        })();
    }, []);

    return (
        <div className="flex justify-center items-center h-screen w-screen">
            <div className="flex-col gap-10 justify-items-center">
                <CircularProgress size={69} className={"mb-14"}/>
                <Typography className={"sm:text-3xl xl:text-base"}>
                    Logging you out
                </Typography>
            </div>
        </div>
    );
}

export default LogoutPage;