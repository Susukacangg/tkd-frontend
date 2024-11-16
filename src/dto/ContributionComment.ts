export declare interface ContributionComment {
    commentId: number;
    wordId: number;
    username: string;
    comment: string;
    commentDateTime: string;
    editedDateTime: string | null;
    isEdited: boolean;
    isDeleted: boolean;
}