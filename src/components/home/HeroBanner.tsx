import {Button, InputBase, Typography} from "@mui/material";

const InputWithButton = ({children, placeholder}: {children: string, placeholder?: string}) => {
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

function HeroBanner() {
    return (
        <div className="w-full relative h-fit">
            <img src="/kadazanpplenhanced.jpeg" alt="landing image"
                 className={"rounded-lg w-full"}/>

            {/*search bar and text section*/}
            <div className={"flex flex-col justify-between w-fit absolute bottom-12 left-14"}>
                <Typography variant={"h3"}
                            color={"white"}
                            fontWeight={"bold"}
                            className={"mb-6 !text-nowrap"}>
                    Discover new words
                </Typography>

                <InputWithButton placeholder={"Search"}>
                    Search
                </InputWithButton>
            </div>
        </div>
    );
}

export default HeroBanner;