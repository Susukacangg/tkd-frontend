import {ExternalToast, toast} from "sonner";
import {Close} from "@mui/icons-material"

export const TOAST_CUSTOM_CLOSE_BTN: ExternalToast = {
    cancel: {
        label: <Close fontSize={"small"}/>,
        onClick: () => toast.dismiss
    }
}