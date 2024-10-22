export default interface DictionaryItem {
    wordId: number | null;
    word: string;
    translations: string;
    usageExamples: string;
}