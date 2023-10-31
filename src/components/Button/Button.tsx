import { useEffect, useRef } from "react";
import { colors } from "src/colors";
import { Loader } from "react-feather";
import { Container, AnimatedLoader } from "./Button.style";

interface props {
    onClick: () => void;
    children: JSX.Element | string;
    background?: string;
    color?: string;
    width?: number | string;
    height?: number | string;
    disabled?: boolean;
    loading?: boolean;
    focus?: boolean;
}

export default function Button({onClick, focus, children, background, color, width, height, disabled, loading}: props){
    
    const buttonRef = useRef(null);

    const buttonStyle = {
        width: width ?? '180px',
        height: height ?? '50px',
        color: color ?? colors.white,
        background: background ?? colors.black,
        opacity: disabled? 0.4 : 1,
    }
    
    const handleClick = () => {
        onClick();
    }

    useEffect(() => {
        if(focus === true){
            buttonRef.current.focus();
        } else {
            buttonRef.current.blur();
        }
    }, [focus]);

    const content = (loading)
    ? <AnimatedLoader>
        <Loader width={'100%'} height={'100%'} color={colors.white}/>
      </AnimatedLoader>
    : children;

    return (
        <Container ref={buttonRef} disabled={disabled} style={buttonStyle} onClick={handleClick}>
            {content}
        </Container>
    )
}