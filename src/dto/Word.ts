import Translation from "./Translation.ts";
import UsageExamples from "./UsageExamples.ts";

export default interface Word {
    word: string;
    translations: Translation[];
    usageExamples: UsageExamples[];
}