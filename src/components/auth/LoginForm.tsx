import FormInput from "../form-components/FormInput.tsx";
import FieldLabel from "../form-components/FieldLabel.tsx";
import FormContainer from "../form-components/FormContainer.tsx";
import FormFooter from "../form-components/FormFooter.tsx";

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