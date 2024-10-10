import FormInput from "./FormInput.tsx";
import FieldLabel from "./FieldLabel.tsx";
import FormContainer from "./FormContainer.tsx";
import FormFooter from "./FormFooter.tsx";
import {Form} from "react-router-dom";
import {Button} from "@mui/material";

function LoginForm() {
    return(
        <FormContainer headerString={"Welcome to The Kadazandusun Dictionary"}
                       subHeaderString={"Log in to access our features and contribute to preserving the Kadazandusun language."}
                       formFooter={<FormFooter text={"Don't have an account yet?"}
                                               linkText={"Create a new account"}
                                               linkRoute={"/register"}/>}>
            <Form method={"POST"}
                  className={"mt-10 w-1/2"}>
                <div className={"mb-1 flex flex-col justify-between gap-6"}>
                    <FieldLabel title={"Email"}/>
                    <FormInput type={"email"} placeholder={"name@email.com"} name={"email"}/>

                    <FieldLabel title={"Password"}/>
                    <FormInput type={"password"} placeholder={"********"} name={"password"}/>
                </div>
                <Button variant={"contained"}
                        className={"mt-6 capitalize w-full text-lg"}>
                    Login
                </Button>
            </Form>
        </FormContainer>
    );
}

export default LoginForm;