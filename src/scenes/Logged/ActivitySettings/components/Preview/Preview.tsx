import { ActivityCard, CustomCircleIcon } from "src/components";
import { activityType } from "src/types";
import { colors } from "src/colors";
import { Check, XCircle } from "react-feather";
import { useGlobalContext } from "src/contexts/GlobalContextProvider";
import { Buttons, Container, Gsap, Invalid, Title, UpperBar } from "./Preview.style";

interface props {
    title: string;
    errorMsg: string | null;
    activity: activityType;
    onConfirm: () => void;
    onDiscard: () => void;
}

export default function Preview({title, errorMsg, activity, onConfirm, onDiscard}: props){
    const { innerHeight } = useGlobalContext();
    const buttonSize = (innerHeight > 740)? 40 : 35;

    const isDisabled = () => {
        if(errorMsg
          || !activity
          || !activity.what
          || !activity.where
          || !activity.who
        ) return true;
        return false;
    }

    const onConfirmClick = () => {
        !isDisabled() && onConfirm();
    }

    const onDiscardClick = () => {
        onDiscard();
    }

    return (
        <Container>
            <UpperBar>
                <Title>
                    {title}
                </Title>
                <Buttons>
                    <Gsap style={{opacity: (isDisabled()? 0.4 : 1)}} onClick={onConfirmClick}>
                        <CustomCircleIcon
                            innerIcon={Check}
                            width={buttonSize}
                            height={buttonSize}
                            color={colors.green}
                            strokeWidth={1}
                        />
                    </Gsap>
                    <Gsap onClick={onDiscardClick}>
                        <XCircle
                            width={buttonSize}
                            height={buttonSize}
                            color={colors.red}
                            strokeWidth={1}
                        />
                    </Gsap>
                </Buttons>
            </UpperBar>
            <ActivityCard
                highlighted
                {...activity}
            />
            <Invalid>
                {errorMsg}
            </Invalid>
        </Container>
    )
}