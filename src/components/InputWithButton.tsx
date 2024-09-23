import {Button, InputBase} from "@mui/material";

function InputWithButton({children, placeholder}: {children: string, placeholder?: string}) {
    return (
        <div className={"w-full items-center p-3 flex bg-white rounded-md"}>
            <InputBase type={"text"}
                       color={"primary"}
                       placeholder={placeholder}
                       className={"grow "}/>
            <Button color={"primary"}
                    variant={"contained"}
                    className={"capitalize ml-2"}>
                {children}
            </Button>
        </div>
    );
}

export default InputWithButton;