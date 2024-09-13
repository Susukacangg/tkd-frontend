import {Button, Input, Typography} from "@material-tailwind/react";

function HeroBanner() {
    return (
        <div className="w-full relative h-fit border-2">
            <img src="../../public/kadazanpplenhanced.jpeg" alt="landing image"
                 className={"rounded-lg"}/>

            {/*search bar and text section*/}
            <div className={"flex flex-col justify-between w-fit absolute bottom-16 left-14"}>
                <Typography variant={"h1"} color={"white"}
                            className={"mb-8 !text-nowrap"}>
                    Discover new words
                </Typography>

                {/*input bar with button inside*/}
                <div className={"w-full relative"}>
                    <Input type={"text"} size={"lg"}
                           placeholder={"Search for words"}
                           className={"!bg-white !text-black !py-7 !text-xl focus:!border-none placeholder-shown:!border-none placeholder:opacity-100 placeholder-gray-600"}
                           labelProps={{
                               className: "hidden",
                           }}/>
                    <Button size={"sm"}
                            className={"bg-primary text-md capitalize !absolute top-2 right-3"}>
                        Search
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default HeroBanner;