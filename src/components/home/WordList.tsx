import WordListItem from "./WordListItem.tsx";
import WordData from "../../component-props/word-data.ts";

const wordListItems: WordData[] = [
    {id: "tokou1", word: "tokou"},
    {id: "manakau1", word: "manakau"},
    {id: "talib1", word: "talib"},
]

function WordList() {

    return(
        <>
            {wordListItems.map((data) => {
                return <WordListItem key={data.id} wordData={data} />;
            })}
        </>
    );
}

export default WordList;