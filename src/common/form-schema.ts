import {PASS_REGEX, USERNAME_REGEX} from "./CommonConst.ts";
import {z} from "zod";
import IamService from "../service/iam-service.ts";

export const RegisFormSchema = z.object({
    username: z.string().trim()
        .min(3, {
            message: "Username must contain at least 3 characters"
        })
        .refine(value => USERNAME_REGEX.test(value), {
            message: "Invalid username"
        })
        .refine(async (value) => {
            try {
                return !await IamService.checkUsername(value)
            } catch (error: any) {
                return error.message;
            }
        }, {message: "Username taken!"}),
    email: z.string().email()
        .refine(async (value) => {
            try {
                return !await IamService.checkEmail(value)
            } catch (error: any) {
                return error.message;
            }
        }, {message: "Email already registered!"}),
    password: z.string().regex(PASS_REGEX, "Invalid password"),
    confirmPassword: z.string()
        .refine((value) => value !== "", {
            message: "Please confirm your password"
        })
}).refine(({password, confirmPassword}) => confirmPassword === password, {
    path: ["confirmPassword"],
    message: "Passwords do not match"
});

export const LoginFormSchema = z.object({
    login: z.string().trim()
        .min(1, {
            message: "Username required!"
        }),
    password: z.string().trim().min(1, {
        message: "Password required!"
    }),
})