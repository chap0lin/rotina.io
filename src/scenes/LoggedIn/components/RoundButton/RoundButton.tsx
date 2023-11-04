import { useRef } from "react";
import { Plus } from "react-feather";
import { colors } from "src/colors";
import { IconContainer } from "./RoundButton.style";
import gsap from "gsap";

interface props {
    onClick: () => void;
}

export default function RoundButton({onClick}: props){
    
    const buttonRef = useRef(null);
    const iconRef = useRef(null);

    const onButtonClick = () => {
        gsap.timeline().to(iconRef.current, {
            rotate: -90,
            duration: 1,
            ease: 'elastic',
        }).to(iconRef.current, {
            rotate: 0,
            duration: 0,
        }).call(onClick);
    }
    
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