import { useGlobalContext } from "src/contexts/GlobalContextProvider";
import { ActivityCard, Button } from "src/components";
import { activityType } from "src/types";
import { colors } from "src/colors";
import { texts } from "./Preview.lang";
import { Buttons, Container } from "./Preview.style";

interface props {
    activity: activityType;
    onConfirmClick: () => void;
    onDiscardClick: () => void;
}

export default function Preview({activity, onConfirmClick, onDiscardClick}: props){
    const { language } = useGlobalContext();
    const previewTexts = texts.get(language);

    const isIncomplete = () => {
        if(!activity
          || !activity.what
          || !activity.where
          || !activity.who
        ) return true;
        return false;
    }

    return (
        <Container>
            <ActivityCard
                highlighted
                {...activity}
            />
            <Buttons>
                <Button
                    disabled={isIncomplete()}
                    onClick={onConfirmClick}
                    color={colors.green}
                    background={colors.white}
                    border={`1.5px solid ${colors.green}`}
                >
                   {previewTexts.yes}
                </Button>
                <Button
                    onClick={onDiscardClick}
                    color={colors.red}
                    background={colors.white}
                    border={`1.5px solid ${colors.red}`}
                >
                    {previewTexts.nope}
                </Button>
            </Buttons>
        </Container>
    )
}