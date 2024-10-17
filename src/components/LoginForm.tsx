import FieldLabel from "./FieldLabel.tsx";
import FormContainer from "./FormContainer.tsx";
import FormFooter from "./FormFooter.tsx";
import {Button, CircularProgress, TextField} from "@mui/material";
import {SubmitHandler, useForm} from "react-hook-form";
import {LoginFormSchema} from "../common/form-schema.ts";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import LoginRequest from "../dto/LoginRequest.ts";
import {TOAST_CUSTOM_CLOSE_BTN} from "../common/toast-custom-close-btn.tsx";
import {toast} from "sonner";
import IamService from "../service/iam-service.ts";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../contexts/AuthContext.tsx";

type LoginFormFields = z.infer<typeof LoginFormSchema>

function LoginForm() {
    const {loginUser} = useAuth();
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: {errors, isSubmitting},
    } = useForm<LoginFormFields>({
        resolver: zodResolver(LoginFormSchema),
    });

    const handleFormSubmit: SubmitHandler<LoginFormFields> = async (data: LoginFormFields) => {
        const loginReq: LoginRequest = {
            login: data.login,
            password: data.password,
        }

        try {
            const response: string = await IamService.login(loginReq);
            loginUser();
            toast.success(response, TOAST_CUSTOM_CLOSE_BTN);
            navigate("/home");
        } catch (error: any) {
            if (error.status === 401)
                toast.error("The login ID or password you provided is incorrect.", TOAST_CUSTOM_CLOSE_BTN);
            else
                toast.error(error.message, TOAST_CUSTOM_CLOSE_BTN);
        }
    }

    return(
        <FormContainer headerString={"Welcome to The Kadazandusun Dictionary"}
                       subHeaderString={"Log in to access our features and contribute to preserving the Kadazandusun language."}
                       formFooter={<FormFooter text={"Don't have an account yet?"}
                                               linkText={"Create a new account"}
                                               linkRoute={"/register"}/>}>
            <form onSubmit={handleSubmit(handleFormSubmit)}
                  className={"mt-10 w-1/2"}>
                <div className={"mb-1 flex flex-col justify-between gap-6"}>
                    <FieldLabel title={"Username or Email"}/>
                    <TextField type={"text"}
                               placeholder={"example@mail.com"}
                               error={errors.login && true}
                               helperText={errors.login?.message}
                               {...register("login")}/>

                    <FieldLabel title={"Password"}/>
                    <TextField type={"password"}
                               placeholder={"********"}
                               error={errors.password && true}
                               helperText={errors.password?.message}
                               {...register("password")}/>
                </div>
                <Button variant={"contained"}
                        type={"submit"}
                        disabled={isSubmitting}
                        className={"mt-6 capitalize w-full text-lg"}>
                    {isSubmitting? <CircularProgress color="secondary" size={28}/> : "Login"}
                </Button>
            </form>
        </FormContainer>
);
}

export default LoginForm;