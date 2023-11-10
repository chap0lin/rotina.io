import { useLayoutEffect, useRef } from "react";
import { Plus } from "react-feather";
import { colors } from "src/colors";
import { IconContainer } from "./RoundButton.style";
import { reactToClick, spawn, vanish } from "src/functions/animation";
interface props {
    show: boolean;
    onClick: () => void;
}

export default function RoundButton({show, onClick}: props){
    const iconRef = useRef(null);

    const onButtonClick = () => {
        reactToClick(iconRef.current, onClick, 0.5);
    }
    
    useLayoutEffect(() => {
        vanish(iconRef.current);
    }, []);

    useLayoutEffect(() => {
        (show)
        ? spawn(iconRef.current, 1)
        : vanish(iconRef.current, 1);
    }, [show]);

    return(
        <IconContainer ref={iconRef} onClick={onButtonClick}>
            <Plus
                strokeWidth={2}
                color={colors.white}
                width={"100%"}
                height={"100%"}
            />
        </IconContainer>
    )
}