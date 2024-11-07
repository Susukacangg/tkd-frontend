import {PASS_REGEX, USERNAME_REGEX} from "./constants.ts";
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
            if(value.length > 2) {
                try {
                    return !await IamService.checkUsername(value)
                } catch (error: any) {
                    return error.message;
                }
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
    password: z.string().regex(PASS_REGEX, "Must contain at least 1 uppercase letter\n" +
        "Must contain at lest 1 digit\n" +
        "Must contain at least 1 special character (@$!%*?&/)\n" +
        "Must be 8 characters long"),
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

export const WordDetailsFormSchema = z.object({
    wordId: z.number().optional(),
    word: z.string().trim().min(1, {
        message: "Please enter a word or phrase"
    }),
    translations: z.object({
        translationId: z.number().nullable(),
        translation: z.string().trim().min(1, {
            message: "Translation is required"
        })
    }).array(),
    usageExamples: z.object({
        exampleId: z.number().nullable(),
        example: z.string().trim().min(1, {
            message: "Example is required"}),
        exampleTranslation: z.string().trim().min(1, {
            message: "Example translation is required"})
    }).array()
})

export const ReportWordFormSchema = z.object({
    wordId: z.number(),
    reportedBy: z.string().trim(),
    reportType: z.string().trim(),
    reportDescription: z.string().trim()
})