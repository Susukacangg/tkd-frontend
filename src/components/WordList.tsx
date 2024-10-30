import WordListItem from "./WordListItem.tsx";
import Word from "../dto/Word.ts";

function WordList({words}: {words: Word[] }) {

    return(
        <>
            {words.map((item: Word) => {
                return <WordListItem key={item.wordId}
                                     word={item} />;
            })}
        </>
    );
}

export default WordList;