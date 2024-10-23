import Word from "../dto/Word.ts";
import {dictionaryClient} from "../common/api-client.ts";
import DictionaryItem from "../dto/DictionaryItem.ts";

export default class DictionaryService {
    static async addWord(newWord: Word): Promise<any> {
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

    static async getRandomWords(pageNumber: number, controller: AbortController): Promise<any> {
        try {
            const response = await dictionaryClient.get("/dict/random", {
                params: {pageNumber: pageNumber},
                timeout: 3000,
                timeoutErrorMessage: "Failed to get random words",
                signal: controller.signal,
            })

            return response.data;
        } catch (error) {
            throw error;
        }
    }

    static async getWord(wordId: number, controller: AbortController): Promise<DictionaryItem> {
        try {
            const response = await dictionaryClient.get(`/dict/${wordId}`, {
                timeout: 2000,
                timeoutErrorMessage: "Failed to get word",
                signal: controller.signal
            })

            return response.data
        } catch (error) {
            throw error;
        }
    }
};