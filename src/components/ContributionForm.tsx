import FormContainer from "./FormContainer.tsx";
import FormInput from "./FormInput.tsx";
import FieldLabel from "./FieldLabel.tsx";
import {useState} from "react";
import {Button, IconButton, TextField} from "@mui/material";
import {AddCircle, RemoveCircle} from "@mui/icons-material";
import * as React from "react";
import {Form} from "react-router-dom";

interface TranslationInputSectionProps {
    label: string;
    values: string[];
    updateValueFunc: (index: number, value: string) => void;
    addInputFunc: () => void;
    removeInputFunc: (index: number) => void;
}

interface Example {
    example: string;
    exampleTrans: string;
}

interface ExampleInputSectionProps {
    label: string;
    examples: Example[];
    updateInput: (index: number, key: keyof Example, value: string) => void;
    addExampleInput: () => void;
    removeExampleInput: (index: number) => void;
}

const TranslationInputSection = ({label, values, updateValueFunc, addInputFunc, removeInputFunc}: TranslationInputSectionProps) => {

    return (
        <div className={"flex flex-col gap-6"}>
            <FieldLabel title={label}/>
            {values.map((value: string, index: number) => (
                <div key={`${label}-${index}`}
                     className={"flex gap-3 items-center"}>
                    <TextField value={value || ""}
                               placeholder={`translation ${index + 1}`}
                               rows={3}
                               maxRows={3}
                               required
                               className={"w-3/4"}
                               onChange={(e) => updateValueFunc(index, e.target.value)}/>
                    {values.length > 1 &&
                        <IconButton color={"error"}
                                    onClick={() => removeInputFunc(index)}>
                            <RemoveCircle fontSize={"large"}
                                          color={"error"}/>
                        </IconButton>
                    }
                </div>
            ))}
            <Button variant={"contained"}
                    className={"w-1/3 capitalize bg-gray-900"}
                    onClick={addInputFunc}>
                Add {label.toLowerCase()} <AddCircle fontSize={"small"}
                                                     className={"ml-2"}/>
            </Button>
        </div>
    );
}

const ExampleInputSection = ({label, examples, updateInput, addExampleInput, removeExampleInput}: ExampleInputSectionProps) => {
    return (
        <div className={"flex flex-col gap-6"}>
            <FieldLabel title={label}/>
            {examples.map((ex, index) => (
                <div key={`example-${index}`}
                     className={"flex flex-col gap-3"}>
                    <div className={"flex gap-3 items-center"}>
                        <TextField value={ex.example}
                                   multiline
                                   rows={3}
                                   placeholder={`example ${index + 1}`}
                                   required
                                   className={"w-3/4"}
                                   onChange={(e) => updateInput(index, "example", e.target.value)}/>
                        {examples.length > 1 &&
                            <IconButton color={"error"}
                                        onClick={() => removeExampleInput(index)}>
                                <RemoveCircle fontSize={"large"}
                                              color={"error"}/>
                            </IconButton>}
                    </div>

                    <TextField value={ex.exampleTrans}
                               multiline
                               rows={3}
                               placeholder={`example translation ${index + 1}`}
                               required
                               className={"w-3/4"}
                               onChange={(e) => updateInput(index, "exampleTrans", e.target.value)}/>
                </div>
            ))}

            <Button variant={"contained"}
                    className={"w-1/3 capitalize bg-gray-900"}
                    onClick={addExampleInput}>
                Add example <AddCircle fontSize={"small"}
                                       className={"ml-2"}/>
            </Button>
        </div>
    );
}

function ContributionForm() {
    const [translationInputValues, setTranslationInputValues] = useState([""]);
    const [exampleValues, setExampleValues] = useState<Example[]>([{example: "", exampleTrans: ""}]);

    const updateTranslationValues = (setValuesHook: React.Dispatch<React.SetStateAction<string[]>>, valueArray: string[]) => (currentIndex: number, newValue: string): void => {
        const updatedValues = [...valueArray];
        updatedValues[currentIndex] = newValue;
        setValuesHook(updatedValues);
    }

    const addTranslationInput = (setValuesHook: React.Dispatch<React.SetStateAction<string[]>>, valueArray: string[]) => (): void => {
        setValuesHook([...valueArray, ""]);
    }

    const removeTranslationInput = (setValuesHook: React.Dispatch<React.SetStateAction<string[]>>, valueArray: string[]) => (inputIndex: number) => {
        setValuesHook(valueArray.filter((_, i) => i !== inputIndex));
    }

    const updateExampleValues = (index: number, key: keyof Example, value: string): void => {
        const updatedExamples = [...exampleValues];
        updatedExamples[index][key] = value;
        setExampleValues(updatedExamples);
    }

    const addExampleInput = (): void => {
        setExampleValues([...exampleValues, {example: "", exampleTrans: ""}]);
    }

    const removeExampleInput = (index: number): void => {
        setExampleValues(exampleValues.filter((_, i) => i !== index));
    }

    return (
        <FormContainer headerString={"Contribute to the dictionary"}>
            <Form method={"POST"}
                  className={"mt-10 w-1/2"}>
                <div className={"mb-1 flex flex-col justify-between gap-6"}>
                    <FieldLabel title={"Word or phrase"}/>
                    <FormInput type={"text"} placeholder={"e.g. tokou"} name={"newword"}/>

                    {/*translation input section*/}
                    <TranslationInputSection label={"Translation"}
                                             values={translationInputValues}
                                             updateValueFunc={updateTranslationValues(setTranslationInputValues, translationInputValues)}
                                             addInputFunc={addTranslationInput(setTranslationInputValues, translationInputValues)}
                                             removeInputFunc={removeTranslationInput(setTranslationInputValues, translationInputValues)}/>

                    {/*examples section*/}
                    <ExampleInputSection label={"Usage example"}
                                         examples={exampleValues}
                                         updateInput={updateExampleValues}
                                         addExampleInput={addExampleInput}
                                         removeExampleInput={removeExampleInput}/>
                </div>
                <Button variant={"contained"}
                        className={"mt-6 capitalize w-full text-lg"}>
                    Submit
                </Button>
            </Form>
        </FormContainer>
);
}

export default ContributionForm;