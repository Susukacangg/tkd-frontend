import {Card, CardBody, Typography} from "@material-tailwind/react";
import WordListItemProps from "../component-props/word-list-item-props.ts";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useNavigate} from "react-router-dom";


function WordListItem({wordData}: WordListItemProps) {
    const navigate = useNavigate();

    return (
        <Card onClick={() => navigate("/definition/" + wordData.id)}
              className={"hover:bg-gray-100 active:bg-gray-50"}>
            <CardBody className="flex flex-row items-center justify-between cursor-pointer">
                <Typography variant={"h5"}>
                    {wordData.word}
                </Typography>
                <FontAwesomeIcon icon={"arrow-right"}
                                 className={"text-xl p-4"}/>
            </CardBody>
        </Card>
    );
}

export default WordListItem;