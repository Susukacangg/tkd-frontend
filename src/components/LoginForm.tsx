import {NavLink} from "react-router-dom";
import {Button, Typography} from "@material-tailwind/react";
import FormInput from "./FormInput.tsx";
import FieldLabel from "./FieldLabel.tsx";

function LoginForm() {
    return(
        <div className={"container flex flex-col justify-center items-start w-full mt-16 mx-auto"}>
            <Typography variant={"h3"}>
                Welcome to The Kadazandusun Dictionary
            </Typography>
            <Typography className={"font-normal text-lg mt-3"}>
                Log in to access our features and contribute to preserving the Kadazandusun language.
            </Typography>
            <form className={"mt-8 w-1/2"}>
                <div className={"mb-1 flex flex-col justify-between gap-6"}>
                    <FieldLabel title={"Email"}/>
                    <FormInput type={"email"} placeholder={"name@email.com"}/>

                    <FieldLabel title={"Password"}/>
                    <FormInput type={"password"} placeholder={"********"}/>
                </div>
                <Button className={"mt-6 capitalize w-full text-md bg-primary"}>
                    Log in
                </Button>
            </form>
            <div className={"flex flex-row mt-6 w-fit"}>
                <Typography>
                    Don't have an account yet? <NavLink to={"/register"} className={"text-blue-300 underline"}>Create a new account</NavLink>
                </Typography>
            </div>
        </div>
    );
}

export default LoginForm;