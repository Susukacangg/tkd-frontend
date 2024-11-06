import Word from "../dto/Word.ts";
import {dictionaryClient} from "../common/api-client.ts";

export default class DictionaryService {
    static async addWord(newWord: any): Promise<any> {
        try {
            const response = await dictionaryClient.post("/dict/add", newWord, {
                withCredentials: true,
                timeoutErrorMessage: "Failed to add word to dictionary"
            })

            return response.data;
        } catch (error: any) {
            throw error;
        }
    }

    static async getRandomWords(controller: AbortController): Promise<Word[]> {
        try {
            const response = await dictionaryClient.get("/dict/random", {
                timeoutErrorMessage: "Failed to get random words",
                signal: controller.signal,
            })

            return response.data;
        } catch (error) {
            throw error;
        }
    }

    static async getWord(wordId: number, controller: AbortController): Promise<Word> {
        try {
            const response = await dictionaryClient.get(`/dict/${wordId}`, {
                timeoutErrorMessage: "Failed to get word",
                signal: controller.signal
            })

            return response.data
        } catch (error) {
            throw error;
        }
    }

    static async searchWord(wordString: string, pageNum: number, controller: AbortController): Promise<any> {
        try {
            const response = await dictionaryClient.get("/dict/search", {
                params: {word: wordString, pageNum: pageNum},
                timeoutErrorMessage: "Failed to search word",
                signal: controller.signal
            });

            return response.data;
        } catch (error) {
            throw error;
        }
    }

    static async suggestWord(searchStr: string): Promise<string[]> {
        try {
            const response = await dictionaryClient.get("/dict/suggest", {
                params: {searchStr: searchStr},
                timeoutErrorMessage: "Failed to get available words"
            })

            return response.data;
        } catch (error) {
            throw error;
        }
    }

    static async getUserContributions(pageNum: number, controller: AbortController): Promise<any> {
        try {
            const response = await dictionaryClient.get("/dict/get-users-words", {
                params: {pageNum: pageNum},
                withCredentials: true,
                timeoutErrorMessage: "Failed to get contributions",
                signal: controller.signal,
            });

            return response.data;
        } catch (error) {
            throw error;
        }
    }

    static async editWord(word: any) {
        try {
            const response = await dictionaryClient.put(`/dict/${word.wordId}`, word, {
                timeoutErrorMessage: "Failed to edit word"
            });

            return response.data;
        } catch (error: any) {
            throw error;
        }
    }

    static async deleteWord(wordId: number): Promise<void> {
        try {
            await dictionaryClient.delete(`/dict/${wordId}`, {
                withCredentials: true,
                timeoutErrorMessage: "Failed to delete word"
            })
        } catch (error) {
            throw error;
        }
    }
};