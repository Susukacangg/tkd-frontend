import {Typography} from "@mui/material";
import InputWithButton from "./InputWithButton.tsx";

function HeroBanner() {
    return (
        <div className="w-full relative h-fit">
            <img src="/kadazanpplenhanced.jpeg" alt="landing image"
                 className={"rounded-lg w-full"}/>

            {/*search bar and text section*/}
            <div className={"flex flex-col justify-between w-fit absolute bottom-16 left-14"}>
                <Typography variant={"h3"} color={"white"}
                            fontWeight={"bold"}
                            className={"mb-8 !text-nowrap"}>
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