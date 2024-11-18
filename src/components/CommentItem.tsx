import {
    Avatar, Button, CircularProgress,
    Dialog,
    DialogTitle, Divider,
    IconButton,
    List,
    ListItem, ListItemButton,
    Menu,
    MenuItem, TextField,
    Tooltip,
    Typography
} from "@mui/material";
import {getAvatarDisplay} from "../common/utility.ts";
import {
    ChevronRight,
    Close,
    DeleteOutline,
    EditOutlined,
    MoreHoriz,
    ReportOutlined
} from "@mui/icons-material";
import {useAuth} from "../contexts/AuthContext.tsx";
import {ContributionComment} from "../dto/ContributionComment.ts";
import {Dispatch, SetStateAction, useState} from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import {z} from "zod";
import {CommentFormSchema, ReportWordCommentFormSchema} from "../common/form-schema.ts";
import {zodResolver} from "@hookform/resolvers/zod";
import {TOAST_CUSTOM_CLOSE_BTN} from "../common/toast-custom-close-btn.tsx";
import {toast} from "sonner";
import DictionaryService from "../service/dictionary-service.ts";

interface ReportCommentDialogProps {
    commentItem: ContributionComment;
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
}

type ReportWordCommentFormFields = z.infer<typeof ReportWordCommentFormSchema>;

const ReportCommentDialog = ({commentItem, isOpen, setIsOpen}: ReportCommentDialogProps) => {
    const reportOptions: string[] = [
        "Inappropriate Content",
        "Spam or Advertising",
        "Harassment or Bullying",
        "Misinformation or False Information",
        "Off-Topic or Irrelevant",
        "Violation of Platform Rules"
    ]

    const {
        setValue,
        handleSubmit,
        formState: {isSubmitting}
    } = useForm<ReportWordCommentFormFields>({
        resolver: zodResolver(ReportWordCommentFormSchema),
        defaultValues: {
            commentId: commentItem.commentId,
            reportedBy: commentItem.username,
            reportType: '',
            reportDateTime: new Date().toISOString()
        }
    });

    const handleClose = () => {
        if (!isSubmitting) {
            setValue('reportType', '');
            setIsOpen(false);
        }
    }

    const handleListItemClick = (value: string) => {
        setValue('reportType', value);
    }

    const handleFormSubmit: SubmitHandler<ReportWordCommentFormFields> = async (data: ReportWordCommentFormFields) => {
        try {
            await DictionaryService.reportContributionComment(data);
            toast.success("Successfully reported comment", TOAST_CUSTOM_CLOSE_BTN);
        } catch (error: any) {
            toast.error(error.message, TOAST_CUSTOM_CLOSE_BTN);
        } finally {
            handleClose();
        }
    }

    return (
        <Dialog open={isOpen}
                onClose={handleClose}
                sx={{
                    '& .MuiDialog-paper': {
                        width: "80%",
                    }
                }}>
            <DialogTitle>
                <div className="flex justify-between items-center w-full">
                    <div className="flex gap-4 items-center w-fit">
                        <Typography variant={'h5'}>
                            Report comment
                        </Typography>
                        {isSubmitting ? <CircularProgress size={25}/> : null}
                    </div>
                    {}
                    <IconButton disabled={isSubmitting}
                                onClick={handleClose}>
                        <Close/>
                    </IconButton>
                </div>
            </DialogTitle>
            <Divider className={"w-full"}/>
            {/*report options*/}
            <List>
                {reportOptions.map((option) => (
                    <ListItem key={option}>
                        <form className={"w-full"}
                              onSubmit={handleSubmit(handleFormSubmit)}>
                            <ListItemButton component={"button"}
                                            type={"submit"}
                                            disabled={isSubmitting}
                                            className={"w-full justify-between"}
                                            onClick={() => handleListItemClick(option)}>
                                <div className="flex justify-between items-center w-full">
                                    <Typography>
                                        {option}
                                    </Typography>
                                    <ChevronRight/>
                                </div>
                            </ListItemButton>
                        </form>
                    </ListItem>
                ))}
            </List>
        </Dialog>
    );
}

type EditCommentFormFields = z.infer<typeof CommentFormSchema>;
type DeleteCommentFormFields = z.infer<typeof CommentFormSchema>;

function CommentItem({commentItem, setReloadComments}: {commentItem: ContributionComment, setReloadComments: Dispatch<SetStateAction<boolean>>}) {
    const {currentUser, isUserAdmin} = useAuth();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [isSaveCommentDisabled, setIsSaveCommentDisabled] = useState(false);
    const isOptionsOpen = Boolean(anchorEl);
    const isUsersComment = currentUser?.username === commentItem.username;

    const {
        register,
        handleSubmit,
        getValues,
        formState: {isSubmitting}
    } = useForm<EditCommentFormFields>({
        resolver: zodResolver(CommentFormSchema),
        defaultValues: {
            commentId: commentItem.commentId,
            comment: commentItem.comment,
            commentedBy: commentItem.username,
            wordId: commentItem.wordId,
            commentDateTime: new Date().toISOString()
        }
    });

    const {
        handleSubmit: deleteHandleSubmit,
        formState: {isSubmitting: deleteIsSubmitting}
    } = useForm<DeleteCommentFormFields>({
        resolver: zodResolver(CommentFormSchema),
        defaultValues: {
            commentId: commentItem.commentId,
            comment: commentItem.comment,
            commentedBy: commentItem.username,
            wordId: commentItem.wordId,
            commentDateTime: commentItem.commentDateTime
        }
    });

    const handleReportOptionClick = () => {
        setAnchorEl(null);
        setIsDialogOpen(true);
    }

    const handleEditOptionClick = () => {
        setAnchorEl(null);
        setIsEditMode(true);
    }

    const handleMenuClose = () => {
        if (!deleteIsSubmitting)
            setAnchorEl(null);
    }

    const handleFormSubmit: SubmitHandler<EditCommentFormFields> = async (data: EditCommentFormFields) => {
        console.log(data);
        try {
            const response = await DictionaryService.editContributionComment(data);
            toast.success(response, TOAST_CUSTOM_CLOSE_BTN)
        } catch (error: any) {
            toast.error(!error.response.data ? error.message : error.response.data,
                TOAST_CUSTOM_CLOSE_BTN);
            console.log(error);
        } finally {
            setIsEditMode(false);
            setReloadComments(true);
        }
    }

    const handleDeleteComment= async (commentId: number) => {
        try {
            const response = await DictionaryService.deleteContributionComment(commentId);
            toast.success(response, TOAST_CUSTOM_CLOSE_BTN);
        } catch (error: any) {
            toast.error(!error.response.data? error.message : error.response.data, TOAST_CUSTOM_CLOSE_BTN);
        } finally {
            setAnchorEl(null);
            setReloadComments(true);
        }
    }

    const handleDelete = () => {
        deleteHandleSubmit(() => handleDeleteComment(commentItem.commentId))();
    }

    const formatDateTime = (dateTimeString: string): string => {
        const serverTimestamp = new Date(dateTimeString).getTime();
        const nowTimestamp = Date.now();

        const milliseconds = nowTimestamp - serverTimestamp;

        const seconds = Math.floor(milliseconds / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);

        if (seconds < 60) {
            return `${commentItem.isEdited ? "edited " : ""}${seconds}s ago`;
        } else if (minutes < 60) {
            return `${commentItem.isEdited ? "edited " : ""}${minutes}m ago`;
        } else if (hours < 24) {
            return `${commentItem.isEdited ? "edited " : ""}${hours}h ago`;
        } else if (days < 7) {
            return `${commentItem.isEdited ? "edited " : ""}${days}d ago`;
        } else {
            const currentDate = new Date(serverTimestamp);
            return `${commentItem.isEdited ? "edited " : ""}${currentDate.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            })}`;
        }
    }

    return (
        <div className="flex flex-col justify-start items-start gap-1 w-full bg-[#f6f6f6] p-3 rounded-lg box-border">
            {/*header of the comment*/}
            <div className="flex justify-between items-center w-full">
                <div className="flex gap-2 justify-between items-center w-fit">
                    <Avatar {...getAvatarDisplay(commentItem.username)}
                            className={"xxs:w-[23px] xxs:h-[23px] lg:w-[30px] lg:h-[30px] xxs:text-sm lg:text-base"}/>
                    <div className="flex gap-2 justify-between items-center w-fit xxs:max-xs:flex-col xxs:max-xs:justify-center xxs:max-xs:items-start xxs:max-xs:gap-0 xxs:max-xs:mb-1.5">
                        <Typography className={"xxs:max-lg:text-sm"}>
                            {commentItem.isDeleted ? "Anonymous" : commentItem.username}
                        </Typography>
                        <Typography color={"grey"}
                                    className={"xxs:ml-0.5 lg:ml-1.5 xxs:max-lg:text-xs"}>
                            {formatDateTime(commentItem.isEdited ? commentItem.editedDateTime as string : commentItem.commentDateTime)}
                        </Typography>
                    </div>
                </div>
                {/*more options button*/}
                <div className="flex justify-between items-center w-fit">
                    {!isEditMode && !commentItem.isDeleted ?
                        <Tooltip title={"More options"}>
                            <IconButton size={"small"}
                                        onClick={(e) => setAnchorEl(e.currentTarget)}>
                                <MoreHoriz className={"text-base"}/>
                            </IconButton>
                        </Tooltip>
                        : null
                    }
                    {/*menu of options button*/}
                    <Menu open={isOptionsOpen}
                          anchorEl={anchorEl}
                          onClose={handleMenuClose}
                          sx={{
                              '& .MuiModal-backdrop': {
                                  backgroundColor: "transparent",
                              }
                          }}>
                        <MenuItem color={"error"}
                                  disabled={deleteIsSubmitting}
                                  className={"xxs:max-xs:py-0 py-2"}
                                  onClick={handleReportOptionClick}>
                            <ReportOutlined color={"error"}
                                    className={"text-xl xxs:mr-1 lg:mr-2"}/>
                            <Typography color={"error"}
                                        className={"xxs:text-xs lg:text-sm"}>
                                Report
                            </Typography>
                        </MenuItem>
                        {isUsersComment && !commentItem.isEdited ?
                            <MenuItem disabled={deleteIsSubmitting}
                                      className={"xxs:max-xs:py-0 py-2"}
                                      onClick={handleEditOptionClick}>
                                <EditOutlined className={"text-black text-xl xxs:mr-1 lg:mr-2"}/>
                                <Typography className={"xxs:text-xs lg:text-sm"}>
                                    Edit
                                </Typography>
                            </MenuItem>
                            : null}
                        {isUsersComment || isUserAdmin ?
                            <MenuItem className={"xxs:max-xs:py-0 py-2"}
                                      disabled={deleteIsSubmitting}
                                      onClick={handleDelete}>
                                {deleteIsSubmitting ?
                                    <CircularProgress size={20}
                                                      className={"text-black mr-2"}/>
                                    : <DeleteOutline className={"text-black text-xl xxs:mr-1 lg:mr-2"}/>}
                                <Typography className={"xxs:text-xs lg:text-sm"}>
                                    Delete
                                </Typography>
                            </MenuItem>
                            : null}
                    </Menu>
                    <ReportCommentDialog commentItem={commentItem}
                                         isOpen={isDialogOpen}
                                         setIsOpen={setIsDialogOpen}/>
                </div>
            </div>

            {/*comment || edit section*/}
            {!isEditMode ?
                <Typography component={"ol"}
                            className={"xxs:-ml-2 lg:-ml-0.5 lg:-mt-0.5 xxs:max-lg:text-sm"}>
                    {commentItem.isDeleted ? "This comment has been removed" : commentItem.comment}
                </Typography>
                :
                <form onSubmit={handleSubmit(handleFormSubmit)}
                      className="flex flex-col gap-4 justify-start items-start mt-4 w-full">
                    <TextField size={"small"}
                               disabled={isSubmitting}
                               placeholder={"Add a comment"}
                               className={"w-full"}
                               {...register('comment', {
                                   onChange: (e) => {
                                       setIsSaveCommentDisabled(!getValues('comment'));
                                       e.target.dispatchEvent(new Event("input", { bubbles: true }));
                                   }
                               })}
                               slotProps={{
                                   input: {
                                       className: "bg-white xxs:text-xs xs:text-sm lg:text-base",
                                       autoComplete: 'off'
                                   }
                               }}/>
                    <div className="flex gap-2 items-center w-fit">
                        <Button variant={"contained"}
                                size={"small"}
                                className={"bg-[#f28b82] capitalize xxs:max-lg:text-xs"}
                                onClick={() => setIsEditMode(false)}>
                            Cancel
                        </Button>
                        <Button variant={"contained"}
                                disabled={isSaveCommentDisabled || isSubmitting}
                                color={"primary"}
                                size={"small"}
                                type={"submit"}
                                className={"capitalize xxs:max-lg:text-xs"}>
                            {isSubmitting ? <CircularProgress size={25}/> : "Save Edit"}
                        </Button>
                    </div>
                </form>
            }
        </div>
    );
}

export default CommentItem;