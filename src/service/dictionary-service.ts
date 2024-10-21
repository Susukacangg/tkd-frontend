import Word from "../dto/Word.ts";
import {dictionaryClient} from "../common/api-client.ts";

export default class DictionaryService {
    static async addWord(newWord: Word): Promise<string> {
        try {
            const response = await dictionaryClient.post("/dict/add", newWord, {
                withCredentials: true,
                timeout: 3000,
                timeoutErrorMessage: "Failed to add word to dictionary"
            })

            return response.data;
        } catch (error: any) {
            throw error;
        }
    }
};