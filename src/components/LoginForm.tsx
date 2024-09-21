import FormInput from "./FormInput.tsx";
import FieldLabel from "./FieldLabel.tsx";
import FormContainer from "./FormContainer.tsx";
import FormFooter from "./FormFooter.tsx";

function LoginForm() {
    return(
        <FormContainer headerString={"Welcome to The Kadazandusun Dictionary"}
                       subHeaderString={"Log in to access our features and contribute to preserving the Kadazandusun language."}
                       btnText={"Login"}
                       formFooter={<FormFooter text={"Don't have an account yet?"}
                                               linkText={"Create a new account"}
                                               linkRoute={"/register"}/>}>
            <FieldLabel title={"Email"}/>
            <FormInput type={"email"} placeholder={"name@email.com"}/>

            <FieldLabel title={"Password"}/>
            <FormInput type={"password"} placeholder={"********"}/>
        </FormContainer>
    );
}

export default LoginForm;