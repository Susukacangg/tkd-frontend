import Translation from "./Translation.ts";
import UsageExamples from "./UsageExamples.ts";

export default interface Word {
    username: string;
    wordId: number;
    word: string;
    translations: Translation[];
    usageExamples: UsageExamples[];
}