import { useLayoutEffect, useRef } from "react";
import { Ball, BallContainer, Container, LeftText, RightText } from "./Slot.style";
import { move } from "src/functions/animation";
import { useGlobalContext } from "src/contexts/GlobalContextProvider";

interface props {
    option1: string;
    option2: string;
    isToggled: boolean;
    onToggle: () => void;
}

export default function Slot({option1, option2, isToggled, onToggle}: props){
    const { innerHeight } = useGlobalContext();
    const ballRef = useRef(null);

    useLayoutEffect(() => {
        const delta = (innerHeight > 750)? 25 : 17;
        const x = (isToggled)? delta : 0;
        move(ballRef.current, {x}, 1);
    }, [isToggled, innerHeight]);

    return (
        <Container>
            <LeftText style={{fontWeight: (!isToggled)? 700 : 400}}>
                {option1}
            </LeftText>
            <BallContainer onClick={onToggle}>
                <Ball ref={ballRef}/>
            </BallContainer>
            <RightText style={{fontWeight: (isToggled)? 700 : 400}}>
                {option2}
            </RightText>
        </Container>
    )
}