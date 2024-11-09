import {Button, Typography} from "@mui/material";
import SearchBar from "./SearchBar.tsx";

function HeroBanner({disableSearch = false}: {disableSearch?: boolean}) {
    return (
        <div className="w-full relative h-fit xxs:hidden xl:block">
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

                <SearchBar isDisabled={disableSearch}
                           classString={"text-xl"}>
                    <Button color={"primary"}
                            variant={"contained"}
                            className={"capitalize ml-2"}>
                        Search
                    </Button>
                </SearchBar>
            </div>
        </div>
    );
}

export default HeroBanner;