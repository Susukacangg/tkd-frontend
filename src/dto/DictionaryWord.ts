import Translation from "./Translation.ts";
import UsageExamples from "./UsageExamples.ts";

export default interface DictionaryWord {
    word: string;
    translations: Translation[];
    usageExamples: UsageExamples[];
}