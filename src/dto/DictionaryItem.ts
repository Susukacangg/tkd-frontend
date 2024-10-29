export default interface DictionaryItem {
    username: string | null;
    wordId: number | null;
    word: string;
    translations: string;
    usageExamples: string;
}