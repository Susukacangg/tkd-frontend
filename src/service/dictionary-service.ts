import Word from "../dto/Word.ts";
import {dictionaryClient} from "../common/api-client.ts";
import Cookies from 'js-cookie';

export default class DictionaryService {
    static async addWord(newWord: any): Promise<any> {
        try {
            const response = await dictionaryClient.post("/dict/add", newWord, {
                headers: {"X-XSRF-TOKEN": Cookies.get("XSRF-TOKEN")},
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
                headers: {"X-XSRF-TOKEN": Cookies.get("XSRF-TOKEN")},
                withCredentials: true,
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
                headers: {"X-XSRF-TOKEN": Cookies.get("XSRF-TOKEN")},
                withCredentials: true,
                timeoutErrorMessage: "Failed to delete word"
            })
        } catch (error) {
            throw error;
        }
    }

    static async reportWord(reportRequest: any): Promise<void> {
        try {
            await dictionaryClient.post('/report-contribution', reportRequest, {
                headers: {"X-XSRF-TOKEN": Cookies.get("XSRF-TOKEN")},
                withCredentials: true,
                timeoutErrorMessage: "Failed to report word"
            })
        } catch (error) {
            throw error;
        }
    }

    static async commentContribution(commentRequest: any): Promise<string> {
        try {
            const response = await dictionaryClient.post(`/dict/comment`, commentRequest, {
                headers: {"X-XSRF-TOKEN": Cookies.get("XSRF-TOKEN")},
                withCredentials: true,
                timeoutErrorMessage: "Failed to add comment"
            })

            return response.data;
        } catch (error) {
            throw error;
        }
    }

    static async getComments(wordId: number, pageNum: number, controller?: AbortController): Promise<any> {
        try {
            const response = await dictionaryClient.get('/dict/comment', {
                params: {wordId: wordId, pageNum: pageNum},
                timeoutErrorMessage: "Failed to get comments",
                signal: controller?.signal
            })

            return response.data;
        } catch (error) {
            throw error;
        }
    }

    static async reportContributionComment(reportRequest: any): Promise<void> {
        try {
            await dictionaryClient.post('/dict/comment/report', reportRequest, {
                headers: {"X-XSRF-TOKEN": Cookies.get("XSRF-TOKEN")},
                withCredentials: true,
                timeoutErrorMessage: "Failed to get comments"
            })
        } catch (error) {
            throw error;
        }
    }

    static async editContributionComment(commentRequest: any): Promise<string> {
        try {
            const response = await dictionaryClient.put(`/dict/comment`, commentRequest, {
                headers: {"X-XSRF-TOKEN": Cookies.get("XSRF-TOKEN")},
                withCredentials: true,
                timeoutErrorMessage: "Failed to add comment"
            })

            return response.data;
        } catch (error) {
            throw error;
        }
    }

    static async deleteContributionComment(commentId: number): Promise<string> {
        try {
            const response = await dictionaryClient.patch(`/dict/comment`, null, {
                headers: {"X-XSRF-TOKEN": Cookies.get("XSRF-TOKEN")},
                params: {commentId: commentId},
                withCredentials: true,
                timeoutErrorMessage: "Failed to delete comment"
            })

            return response.data;
        } catch (error) {
            throw error;
        }
    }
};