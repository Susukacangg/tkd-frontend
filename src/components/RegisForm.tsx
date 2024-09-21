import FieldLabel from "./FieldLabel.tsx";
import FormInput from "./FormInput.tsx";
import FormFooter from "./FormFooter.tsx";
import FormContainer from "./FormContainer.tsx";

function RegisForm() {
    const subHeaderString: string = "Join our community and help revitalize the Kadazandusun language. As a registered user, you can add new words and keep track of your contribution";

    return(
        <FormContainer headerString={"Welcome to The Kadazandusun Dictionary"}
                       subHeaderString={subHeaderString}
                       btnText={"Create Account"}
                       formFooter={<FormFooter text={"Already have an account?"}
                                               linkText={"Log in"}
                                               linkRoute={"/login"}/>}>
            <FieldLabel title={"Username"}/>
            <FormInput type={"text"} placeholder={"username"}/>

            <FieldLabel title={"Email"}/>
            <FormInput type={"email"} placeholder={"name@email.com"}/>

            <FieldLabel title={"Password"}/>
            <FormInput type={"password"} placeholder={"********"}/>

            <FieldLabel title={"Re-enter Password"}/>
            <FormInput type={"password"} placeholder={"********"}/>
        </FormContainer>
    );
}

export default RegisForm;