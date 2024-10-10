import FieldLabel from "./FieldLabel.tsx";
import FormFooter from "./FormFooter.tsx";
import FormContainer from "./FormContainer.tsx";
import {Button, CircularProgress, TextField} from "@mui/material";
import {SubmitHandler, useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import IamService from "../service/iam-service.ts";
import RegisterRequest from "../dto/RegisterRequest.ts";
import AuthResponse from "../dto/AuthResponse.ts";
import {toast} from "sonner";
import {TOAST_CUSTOM_CLOSE_BTN} from "../common/toast-custom-close-btn.tsx";
import {useNavigate} from "react-router-dom";
import {RegisFormSchema} from "../common/form-schema.ts";

type RegisterFormFields = z.infer<typeof RegisFormSchema>;

function RegisForm() {
    const subHeaderString: string = "Join our community and help revitalize the Kadazandusun language. As a registered user, you can add new words and keep track of your contribution";

    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: {errors, isSubmitting}
    } = useForm<RegisterFormFields>({
        resolver: zodResolver(RegisFormSchema)
    });

    const handleFormSubmit: SubmitHandler<RegisterFormFields> = async (data: RegisterFormFields) => {
        const registrationReq: RegisterRequest = {
            username: data.username,
            email: data.email,
            password: data.password,
        }

        try {
            const response: AuthResponse = await IamService.register(registrationReq);
            toast.success(response.responseInfo.message + " You can now log in.", TOAST_CUSTOM_CLOSE_BTN);
            navigate("/login");
        } catch (error: any) {
            toast.error(error.message, TOAST_CUSTOM_CLOSE_BTN);
        }
    };

    return(
        <FormContainer headerString={"Welcome to The Kadazandusun Dictionary"}
                       subHeaderString={subHeaderString}
                       formFooter={<FormFooter text={"Already have an account?"}
                                               linkText={"Log in"}
                                               linkRoute={"/login"}/>}>
            <form onSubmit={handleSubmit(handleFormSubmit)}
                  className={"mt-10 w-1/2"}>
                <div className={"mb-1 flex flex-col justify-between gap-6"}>
                    <FieldLabel title={"Username"}/>
                    <TextField type={"text"}
                               placeholder={"username"}
                               error={errors.username && true}
                               helperText={errors.username?.message}
                               {...register("username")}/>

                    <FieldLabel title={"Email"}/>
                    <TextField type={"text"}
                               placeholder={"example@mail.com"}
                               error={errors.email && true}
                               helperText={errors.email?.message}
                               {...register("email")}/>

                    <FieldLabel title={"Password"}/>
                    <TextField type={"password"}
                               placeholder={"********"}
                               error={errors.password && true}
                               helperText={errors.password?.message}
                               {...register("password")}/>

                    <FieldLabel title={"Re-enter Password"}/>
                    <TextField type={"password"}
                               placeholder={"********"}
                               error={errors.confirmPassword && true}
                               helperText={errors.confirmPassword?.message}
                               {...register("confirmPassword")}/>

                </div>
                <Button variant={"contained"}
                        type={"submit"}
                        disabled={isSubmitting}
                        className={"mt-6 capitalize w-full text-lg"}>
                    {isSubmitting? <CircularProgress color="secondary" size={28}/> : "Create Account"}
                </Button>
            </form>
        </FormContainer>
    );
}

export default RegisForm;