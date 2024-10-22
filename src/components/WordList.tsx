import WordListItem from "./WordListItem.tsx";
import DictionaryItem from "../dto/DictionaryItem.ts";

function WordList({dictionaryItems}: {dictionaryItems: DictionaryItem[] }) {

    return(
        <>
            {dictionaryItems.map((item: DictionaryItem) => {
                return <WordListItem key={item.wordId}
                                     dictionaryItem={item} />;
            })}
        </>
    );
}

export default WordList;