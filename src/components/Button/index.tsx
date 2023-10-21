import { useRef } from "react";
import { colors } from "../../colors";
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
}

export default function Button({onClick, children, background, color, width, height, disabled, loading}: props){
    
    const loaderRef = useRef(null);

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

    const content = (loading)
    ? <AnimatedLoader ref={loaderRef}>
        <Loader width={'100%'} height={'100%'} color={colors.white}/>
      </AnimatedLoader>
    : children;

    return (
        <Container disabled={disabled} style={buttonStyle} onClick={handleClick}>
            {content}
        </Container>
    )
}