import {
    CircularProgress,
    Divider,
    IconButton,
    InputAdornment,
    TextField, Typography,
} from "@mui/material";
import {Send} from "@mui/icons-material";
import {CommentFormSchema} from "../common/form-schema.ts";
import {z} from "zod";
import {SubmitHandler, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {useAuth} from "../contexts/AuthContext.tsx";
import {toast} from "sonner";
import {TOAST_CUSTOM_CLOSE_BTN} from "../common/toast-custom-close-btn.tsx";
import DictionaryService from "../service/dictionary-service.ts";
import {ContributionComment} from "../dto/ContributionComment.ts";
import CommentItem from "./CommentItem.tsx";

type CommentFormFields = z.infer<typeof CommentFormSchema>;

function CommentsList() {

    const [comments, setComments] = useState<ContributionComment[]>([]);
    const [isSendCommentDisabled, setIsCommentDisabled] = useState(true);
    const [pageNum, setPageNum] = useState(1);
    const [numMoreComments, setNumMoreComments] = useState(0);
    const [reloadComments, setReloadComments] = useState(false);
    const [hasMoreComments, setHasMoreComments] = useState(false);
    const [isCommentsLoading, setIsCommentsLoading] = useState(false);
    const [isMoreCommentsLoading, setIsMoreCommentsLoading] = useState(false);
    const {wordId} = useParams();
    const {currentUser} = useAuth();

    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        formState: {isSubmitting}
    } = useForm<CommentFormFields>({
        resolver: zodResolver(CommentFormSchema),
        defaultValues: {
            wordId: parseInt(wordId as string),
            commentedBy: currentUser?.username as string,
            comment: '',
            commentId: null
        }
    });

    const loadComments = async (controller?: AbortController) => {
        try {
            setIsCommentsLoading(true);
            const response = await DictionaryService.getComments(parseInt(wordId as string), 1, controller);

            const comments: ContributionComment[] = response.content;
            const totalComments: number = response.totalElements;

            setComments(comments);
            setHasMoreComments(!response.last);
            setNumMoreComments(totalComments - comments.length);
        } catch (error: any) {
            if (controller?.signal.aborted)
                return;
            toast.error(error.message, TOAST_CUSTOM_CLOSE_BTN);
        } finally {
            setIsCommentsLoading(false);
        }
    }

    const loadMoreComments = async () => {
        try {
            setIsMoreCommentsLoading(true);
            const response = await DictionaryService.getComments(parseInt(wordId as string), pageNum + 1);

            const extraComments: ContributionComment[] = response.content;

            setComments(prevComments => [...prevComments, ...extraComments]);
            setHasMoreComments(!response.last);
            setNumMoreComments(prevNum => prevNum >= 5 ? prevNum - 5 : 0);
            setPageNum(prevPage => prevPage + 1);
        } catch (error: any) {
            toast.error(error.message, TOAST_CUSTOM_CLOSE_BTN);
        } finally {
            setIsMoreCommentsLoading(false);
        }
    }

    const handleFormSubmit: SubmitHandler<CommentFormFields> = async (data: CommentFormFields) => {
        try {
            const response: string = await DictionaryService.commentContribution(data);
            toast.success(response, TOAST_CUSTOM_CLOSE_BTN);
            setReloadComments(true);
            setValue('comment', '');
            setIsCommentDisabled(true);
        } catch (error: any) {
            toast.error(error.message, TOAST_CUSTOM_CLOSE_BTN);
        }
    }

    useEffect(() => {
        const controller = new AbortController();

        loadComments(controller);

        return () => controller.abort()
    }, []);

    useEffect(() => {
        if(reloadComments) {
            setPageNum(1);
            loadComments();
            setReloadComments(false);
        }
    }, [reloadComments]);

    return (
        <div className="flex flex-col justify-start items-center mt-10 mb-14 gap-3 w-2/5">
            {/*comment bar*/}
            <form onSubmit={handleSubmit(handleFormSubmit)}
                  className="flex gap-2 items-center mb-4 w-full">
                <TextField size={"small"}
                           placeholder={"Add a comment"}
                           className={"w-full"}
                           {...register('comment', {
                               onChange: (e) => {
                                   setIsCommentDisabled(!getValues('comment'));
                                   e.target.dispatchEvent(new Event("input", {bubbles: true}));
                               }
                           })}
                           slotProps={{
                               input: {
                                   endAdornment: (
                                       <InputAdornment position={"end"}>
                                           {isSubmitting ?
                                               <CircularProgress size={25}/>
                                               : <IconButton color={"primary"}
                                                             type={"submit"}
                                                             disabled={isSendCommentDisabled || isSubmitting}
                                                             size={"small"}>
                                                   <Send
                                                       color={isSendCommentDisabled || isSubmitting ? "disabled" : "primary"}/>
                                               </IconButton>}

                                       </InputAdornment>
                                   ),
                                   autoComplete: 'off'
                               }
                           }}/>
            </form>

            {/*list of comment items*/}
            {!isCommentsLoading ?
                (comments.length !== 0?
                    comments.map((comment: ContributionComment) => (
                        <CommentItem key={comment.commentId}
                                     commentItem={comment}
                                     setReloadComments={setReloadComments}/>
                    )) :
                    <Typography>
                        No comments yet
                    </Typography>
                ) :
                <div className="flex flex-col gap-3 justify-center items-center">
                    <CircularProgress size={40}/>
                    <Typography className={"text-sm"}>
                        Loading comments
                    </Typography>
                </div>
            }

            {/*load more divider*/}
            {hasMoreComments ?
                <Divider onClick={loadMoreComments}
                         className={"w-full text-gray-500 hover:text-black active:text-gray-400 cursor-pointer selection:bg-none"}
                         sx={{
                             "&::before, &::after": {
                                 borderColor: "#ddd",
                             },
                         }}>
                    {isMoreCommentsLoading ?
                        <CircularProgress size={20}
                                          className={"text-black"}/>
                        :`Load more comments (${numMoreComments})`}
                </Divider>
                : null}
        </div>
    );
}

export default CommentsList;