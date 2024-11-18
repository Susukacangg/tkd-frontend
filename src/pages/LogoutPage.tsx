import {useEffect} from "react";
import {useAuth} from "../contexts/AuthContext.tsx";
import IamService from "../service/iam-service.ts";
import {toast} from "sonner";
import {TOAST_CUSTOM_CLOSE_BTN} from "../common/toast-custom-close-btn.tsx";
import {useNavigate} from "react-router-dom";
import LoadingPage from "./LoadingPage.tsx";

function LogoutPage() {
    const {logoutUser, isAuthenticated} = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const controller = new AbortController;
        (async () => {
            if(isAuthenticated) {
                try {
                    const logoutMessage: string = await IamService.logout(controller);

                    toast.success(logoutMessage, TOAST_CUSTOM_CLOSE_BTN);
                    logoutUser();
                    navigate("/home", {replace: true});
                } catch (error: any) {
                    if(controller.signal.aborted)
                        return;
                    toast.error(error.message, TOAST_CUSTOM_CLOSE_BTN);
                    navigate("/home", {replace: true});
                }
            }
        })();

        return(() => controller.abort());
    }, []);

    return <LoadingPage loadingText={"Logging you out"}/>
}

export default LogoutPage;