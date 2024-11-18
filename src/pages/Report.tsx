import Header from "../components/Header.tsx";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import FieldLabel from "../components/FieldLabel.tsx";
import FormContainer from "../components/FormContainer.tsx";
import {SubmitHandler, useForm} from "react-hook-form";
import DictionaryService from "../service/dictionary-service.ts";
import {toast} from "sonner";
import {TOAST_CUSTOM_CLOSE_BTN} from "../common/toast-custom-close-btn.tsx";
import {Button, CircularProgress, MenuItem, TextField, Typography} from "@mui/material";
import {ReportWordFormSchema} from "../common/form-schema.ts";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import Word from "../dto/Word.ts";

type ReportWordFormFields = z.infer<typeof ReportWordFormSchema>;

function Report() {
    const location = useLocation();
    const navigate = useNavigate();
    const {wordId} = useParams();
    const currentWord: Word = location.state;

    const reportTypeOptions = [
        {label: "Incorrect translation/definition", value: "Incorrect translation/definition"},
        {label: "Spelling/Grammar error", value: "Spelling/Grammar error"},
        {label: "Inaccurate usage example", value: "Inaccurate usage example"},
        {label: "Inappropriate or offensive content", value: "Inappropriate or offensive content"},
        {label: "Duplicate entry", value: "Duplicate entry"},
        {label: "Other", value: "Other"}
    ];

    const {
        register,
        handleSubmit,
        formState: {errors, isSubmitting}
    } = useForm<ReportWordFormFields>({
        resolver: zodResolver(ReportWordFormSchema),
        defaultValues: {
            wordId: parseInt(wordId as string),
            reportedBy: currentWord.username,
            reportType: reportTypeOptions[0].value,
            reportDateTime: new Date().toISOString(),
            reportDescription: ''
        }
    })

    const handleFormSubmit: SubmitHandler<ReportWordFormFields> = async (data: ReportWordFormFields) => {
        try {
            await DictionaryService.reportWord(data);
            toast.success("Successfully reported word", TOAST_CUSTOM_CLOSE_BTN);
            navigate('/home');
        } catch (error: any) {
            toast.error(error.message, TOAST_CUSTOM_CLOSE_BTN);
            console.error("Edit word error: " + error);
        }
    }


    return (
        <>
            <Header enableHomeOnly={true} enableContributeBtn={false} enableSearchBar={false}/>
            <FormContainer headerString={`Report "${currentWord.word}" contributed by ${currentWord.username}`}>
                <form onSubmit={handleSubmit(handleFormSubmit)}
                      className={"lg:mt-16 xl:mt-10 lg:w-full xl:w-1/2"}>
                    <div className={"flex flex-col justify-between xxs:gap-4 lg:gap-14 xl:gap-6 xxs:max-xs:mt-4"}>
                        {/*simple display of the word to be reported*/}
                        <div className="flex flex-col xxs:gap-4 lg:gap-10 xl:gap-4 mb-4">
                            <FieldLabel title={"Translations/Definitions"}/>
                            <div className="flex flex-col xxs:max-xs:gap-1">
                                {currentWord.translations.map((value) => (
                                    <Typography component={"li"} key={value.translationId}
                                                className={"xxs:text-sm lg:text-4xl xl:text-base"}>
                                        {value.translation}
                                    </Typography>
                                ))}
                            </div>

                            <FieldLabel title={"Usage Examples"}/>
                            <div className="flex flex-col xxs:max-xs:gap-1">
                                {currentWord.usageExamples.map((value) => (
                                    <Typography component={"li"} key={value.exampleId}
                                                className={"xxs:text-sm lg:text-4xl xl:text-base"}>
                                        {value.example} ({value.exampleTranslation})
                                    </Typography>
                                ))}
                            </div>
                        </div>

                        {/*report type dropdown*/}
                        <FieldLabel title={"Report type"}/>
                        <TextField select
                                   defaultValue={reportTypeOptions[0].value}
                                   error={errors.reportType && true}
                                   helperText={errors.reportType?.message}
                                   className={"w-11/12"}
                                   slotProps={{
                                       input: {
                                           className: "xxs:text-sm lg:text-5xl xl:text-base"
                                       }
                                   }}
                                   {...register("reportType")}>
                            {reportTypeOptions.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>

                        {/*report description*/}
                        <FieldLabel title={"Report description"}/>
                        <TextField multiline
                                   rows={3}
                                   placeholder={`Translate your example`}
                                   error={errors.reportDescription && true}
                                   helperText={errors.reportDescription?.message}
                                   className={"w-11/12"}
                                   slotProps={{
                                       input: {
                                           className: "xxs:text-sm lg:text-5xl xl:text-base"
                                       }
                                   }}
                                   {...register('reportDescription')}/>
                    </div>

                    {/*submit and reset buttons*/}
                    <div className={"flex lg:w-full xxs:w-11/12 xl:w-11/12 gap-3 lg:mt-16 xl:mt-1"}>
                        <Button variant={"contained"}
                                type={"submit"}
                                disabled={isSubmitting}
                                className={"mt-6 capitalize w-1/2 xxs:text-[10px] lg:text-4xl xl:text-base lg:py-3 xl:py-1.5"}>
                            {isSubmitting ? <CircularProgress size={25}/> : "Submit"}
                        </Button>
                        <Button variant={"contained"}
                                type={"reset"}
                                disabled={isSubmitting}
                                onClick={() => navigate(`/definition/${wordId}`)}
                                className={"mt-6 capitalize w-1/2 xxs:text-[10px] lg:text-4xl xl:text-base lg:py-3 xl:py-1.5"}
                                sx={{backgroundColor: "#f28b82"}}>
                            Cancel
                        </Button>
                    </div>
                </form>
            </FormContainer>
        </>
    );
}

export default Report;