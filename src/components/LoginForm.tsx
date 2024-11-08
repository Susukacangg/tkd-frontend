import FieldLabel from "./FieldLabel.tsx";
import FormContainer from "./FormContainer.tsx";
import FormFooter from "./FormFooter.tsx";
import {Button, CircularProgress, IconButton, InputAdornment, TextField} from "@mui/material";
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
import {Visibility, VisibilityOff} from "@mui/icons-material";
import {useState} from "react";

type LoginFormFields = z.infer<typeof LoginFormSchema>

function LoginForm() {
    const {loginUser} = useAuth();
    const navigate = useNavigate();
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
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
            console.log(error);
            if (error.status === 401)
                toast.error(error.response.data, TOAST_CUSTOM_CLOSE_BTN);
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
                  className={"sm:mt-16 xl:mt-10 sm:w-full xl:w-1/2"}>
                <div className={"flex flex-col justify-between sm:gap-14 xl:gap-6"}>
                    <FieldLabel title={"Username or Email"}/>
                    <TextField type={"text"}
                               placeholder={"example@mail.com"}
                               error={errors.login && true}
                               helperText={errors.login?.message}
                               slotProps={{
                                   input: {
                                       className: "sm:text-5xl xl:text-base"
                                   }
                               }}
                               {...register("login")}/>

                    <FieldLabel title={"Password"}/>
                    <TextField type={isPasswordVisible ? "text" : "password"}
                               placeholder={"********"}
                               error={errors.password && true}
                               helperText={errors.password?.message}
                               slotProps={{
                                   input: {
                                       endAdornment: (
                                           <InputAdornment position={"end"}>
                                               <IconButton onClick={() => {
                                                   isPasswordVisible ? setIsPasswordVisible(false) : setIsPasswordVisible(true)
                                               }}>
                                                   {isPasswordVisible ?
                                                       <VisibilityOff className={"sm:text-5xl xl:text-3xl"}/>
                                                       : <Visibility className={"sm:text-5xl xl:text-3xl"}/>}
                                               </IconButton>
                                           </InputAdornment>
                                       ),
                                       className: "sm:text-5xl xl:text-base",
                                   },
                               }}
                               {...register("password")}/>
                </div>
                <Button variant={"contained"}
                        type={"submit"}
                        disabled={isSubmitting}
                        className={"sm:mt-20 xl:mt-6 capitalize w-full sm:text-4xl xl:text-base sm:py-3 xl:py-1.5"}>
                    {isSubmitting? <CircularProgress color="secondary" size={25}/> : "Login"}
                </Button>
            </form>
        </FormContainer>
);
}

export default LoginForm;