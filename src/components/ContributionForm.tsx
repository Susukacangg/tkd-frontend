import FormContainer from "./FormContainer.tsx";
import FieldLabel from "./FieldLabel.tsx";
import {Button, IconButton, TextField} from "@mui/material";
import {AddCircle, RemoveCircle} from "@mui/icons-material";
import {SubmitHandler, useFieldArray, useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {WordDetailsFormSchema} from "../common/form-schema.ts";
import DictionaryService from "../service/dictionary-service.ts";
import {TOAST_CUSTOM_CLOSE_BTN} from "../common/toast-custom-close-btn.tsx";
import {toast} from "sonner";
import {useNavigate, useSearchParams} from "react-router-dom";

type ContributeFormFields = z.infer<typeof WordDetailsFormSchema>

function ContributionForm() {
    const {
        control,
        register,
        handleSubmit,
        reset,
        setValue,
        formState: {errors, isSubmitting}
    } = useForm<ContributeFormFields>({
        resolver: zodResolver(WordDetailsFormSchema),
        defaultValues: {
            word: '',
            translations: [{
                translation: ''
            }],
            usageExamples: [{
                example: '',
                exampleTranslation: '',
            }]
        }
    })

    const {
        fields: translationFields,
        remove: removeTranslation,
        append: appendTranslation
    } = useFieldArray({
        name: "translations",
        control
    })
    const {
        fields: exampleFields,
        remove: removeExample,
        append: appendExample
    } = useFieldArray({
        name: "usageExamples",
        control
    });

    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const newWordFromSuggestion = searchParams.get("word");

    if(newWordFromSuggestion)
        setValue("word", newWordFromSuggestion as string);

    const handleFormSubmit: SubmitHandler<ContributeFormFields> = async (data: ContributeFormFields) => {
        try {
            const response = await DictionaryService.addWord(data);
            toast.success("Successfully added word", TOAST_CUSTOM_CLOSE_BTN);
            navigate(`/definition/${response}`);
        } catch (error) {
            console.error("Add new word error: " + error);
        }
    }

    return (
        <FormContainer headerString={"Contribute to the dictionary"}>
            <form onSubmit={handleSubmit(handleFormSubmit)}
                  className={"mt-10 w-1/2"}>
                <div className={"mb-1 flex flex-col justify-between gap-6"}>
                    {/*word or phrase section*/}
                    <FieldLabel title={"Word or phrase"}/>
                    <TextField type={"text"}
                               placeholder={"e.g. tokou"}
                               error={errors.word && true}
                               helperText={errors.word?.message}
                               className={"w-11/12"}
                               {...register('word')}/>

                    {/*translation input section*/}
                    <FieldLabel title={"Translation"}/>
                    {translationFields.map((field, index) => {
                        return (
                            <div key={field.id} className={"flex flex-col gap-6"}>
                                <div className={"flex gap-3 items-center"}>
                                    <TextField placeholder={`translation ${index + 1}`}
                                               rows={3}
                                               maxRows={3}
                                               error={errors.translations?.[index]?.translation && true}
                                               helperText={errors.translations?.[index]?.translation?.message}
                                               className={"w-11/12"}
                                               {...register(`translations.${index}.translation`)}/>

                                    {translationFields.length > 1 &&
                                        <IconButton color={"error"}
                                                    onClick={() => removeTranslation(index)}>
                                            <RemoveCircle fontSize={"large"}
                                                          color={"error"}/>
                                        </IconButton>
                                    }
                                </div>
                            </div>
                        );
                    })}
                    <Button variant={"contained"}
                            className={"w-1/3 capitalize bg-gray-900"}
                            onClick={() => appendTranslation({
                                translation: ''
                            })}>
                        Add translation <AddCircle fontSize={"small"}
                                                   className={"ml-2"}/>
                    </Button>

                    {/*examples section*/}
                    <FieldLabel title={"Usage examples"}/>
                    {exampleFields.map((field, index) => {
                        return(
                            <div key={field.id} className={"flex flex-col gap-6"}>
                                <div className={"flex flex-col gap-3"}>
                                    <div className={"flex gap-3 items-center"}>
                                        <TextField multiline
                                                   rows={3}
                                                   placeholder={`example ${index + 1}`}
                                                   error={errors.usageExamples?.[index]?.example && true}
                                                   helperText={errors.usageExamples?.[index]?.example?.message}
                                                   className={"w-11/12"}
                                                   {...register(`usageExamples.${index}.example` as const)}/>
                                        {exampleFields.length > 1 &&
                                            <IconButton color={"error"}
                                                        onClick={() => removeExample(index)}>
                                                <RemoveCircle fontSize={"large"}
                                                              color={"error"}/>
                                            </IconButton>}
                                    </div>

                                    <TextField multiline
                                               rows={3}
                                               placeholder={`Translate your example`}
                                               error={errors.usageExamples?.[index]?.exampleTranslation && true}
                                               helperText={errors.usageExamples?.[index]?.exampleTranslation?.message}
                                               className={"w-11/12"}
                                               {...register(`usageExamples.${index}.exampleTranslation` as const)}/>
                                </div>
                            </div>
                        );
                    })}
                    <Button variant={"contained"}
                            className={"w-1/3 capitalize bg-gray-900"}
                            onClick={() => appendExample({
                                example: '',
                                exampleTranslation: ''
                            })}>
                        Add example <AddCircle fontSize={"small"}
                                               className={"ml-2"}/>
                    </Button>
                </div>

                {/*submit and reset buttons*/}
                <div className={"flex w-11/12 gap-3"}>
                    <Button variant={"contained"}
                            type={"submit"}
                            disabled={isSubmitting}
                            className={"mt-6 capitalize w-1/2 text-lg"}>
                        Submit
                    </Button>
                    <Button variant={"contained"}
                            type={"reset"}
                            disabled={isSubmitting}
                            onClick={() => reset()}
                            className={"mt-6 capitalize w-1/2 text-lg"}
                            sx={{backgroundColor: "#f28b82"}}>
                        Reset
                    </Button>
                </div>
            </form>
        </FormContainer>
    );
}

export default ContributionForm;