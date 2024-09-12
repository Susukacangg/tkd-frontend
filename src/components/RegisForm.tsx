import {Button, Typography} from "@material-tailwind/react";
import FieldLabel from "./FieldLabel.tsx";
import FormInput from "./FormInput.tsx";
import {NavLink} from "react-router-dom";

function RegisForm() {
    return(
        <div className={"container flex flex-col justify-center items-start w-full mt-16 mx-auto"}>
            <div className={"flex flex-col justify-between w-3/4"}>
                <Typography variant={"h3"}>
                    Welcome to The Kadazandusun Dictionary
                </Typography>
                <Typography className={"font-normal text-lg mt-3"}>
                    Join our community and help revitalize the Kadazandusun language. As a registered user, you can add
                    new words and keep track of your contributions.
                </Typography>
            </div>
            <form className={"mt-8 w-1/2"}>
                <div className={"mb-1 flex flex-col justify-between gap-6"}>
                    <FieldLabel title={"Username"}/>
                    <FormInput type={"text"} placeholder={"username"}/>

                    <FieldLabel title={"Email"}/>
                    <FormInput type={"email"} placeholder={"name@email.com"}/>

                    <FieldLabel title={"Password"}/>
                    <FormInput type={"password"} placeholder={"********"}/>

                    <FieldLabel title={"Re-enter Password"}/>
                    <FormInput type={"password"} placeholder={"********"}/>
                </div>
                <Button className={"mt-6 capitalize w-full text-md bg-primary"}>
                    Create Account
                </Button>
            </form>
            <div className={"flex flex-row mt-6 w-fit"}>
                <Typography>
                    Already have an account? <NavLink to={"/login"} className={"text-blue-300 underline"}>Log in</NavLink>
                </Typography>
            </div>
        </div>
    );
}

export default RegisForm;