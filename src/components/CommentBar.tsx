import {SubmitHandler, useForm} from "react-hook-form";
import { CommentFormSchema } from "../common/form-schema";
import {zodResolver} from "@hookform/resolvers/zod";
import DictionaryService from "../service/dictionary-service.ts";
import {TOAST_CUSTOM_CLOSE_BTN} from "../common/toast-custom-close-btn.tsx";
import {toast} from "sonner";
import {CircularProgress, IconButton, InputAdornment, TextField} from "@mui/material";
import {Send} from "@mui/icons-material";
import {z} from "zod";
import {Dispatch, SetStateAction} from "react";
import {useParams} from "react-router-dom";
import {useAuth} from "../contexts/AuthContext.tsx";

type CommentFormFields = z.infer<typeof CommentFormSchema>;

function CommentBar({setReloadComments}: {setReloadComments: Dispatch<SetStateAction<boolean>>}) {
    const {wordId} = useParams();
    const {currentUser} = useAuth();

    const {
        register,
        handleSubmit,
        setValue,
        formState: {isSubmitting},
        watch
    } = useForm<CommentFormFields>({
        resolver: zodResolver(CommentFormSchema),
        defaultValues: {
            comment: '',
            commentId: null,
            wordId: parseInt(wordId as string)
        }
    });

    const commentField = watch('comment');
    setValue('commentedBy', currentUser?.username as string);
    setValue('commentDateTime', new Date().toISOString());

    const handleFormSubmit: SubmitHandler<CommentFormFields> = async (data: CommentFormFields) => {
        try {
            const response: string = await DictionaryService.commentContribution(data);
            toast.success(response, TOAST_CUSTOM_CLOSE_BTN);
            setReloadComments(true);
            setValue('comment', '');
        } catch (error: any) {
            toast.error(error.message, TOAST_CUSTOM_CLOSE_BTN);
        }
    }

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)}
              className="flex gap-2 items-center mb-4 w-full">
            <TextField size={"small"}
                       placeholder={"Add a comment"}
                       disabled={isSubmitting}
                       className={"w-full"}
                       {...register('comment')}
                       slotProps={{
                           input: {
                               endAdornment: (
                                   <InputAdornment position={"end"}>
                                       {isSubmitting ?
                                           <CircularProgress size={25}/>
                                           : <IconButton color={"primary"}
                                                         type={"submit"}
                                                         disabled={!commentField || isSubmitting}
                                                         size={"small"}>
                                               <Send
                                                   color={!commentField || isSubmitting ? "disabled" : "primary"}
                                                   className={"xxs:max-md:text-lg"}/>
                                           </IconButton>}

                                   </InputAdornment>
                               ),
                               autoComplete: 'off',
                               className: "xxs:max-md:text-sm"
                           }
                       }}/>
        </form>
    );
}

export default CommentBar;