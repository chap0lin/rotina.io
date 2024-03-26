import { reactToClick, rotate } from "src/functions/animation";
import { Container, Content } from "./RotatingButton.style";
import { useRef } from "react";

interface props {
    size?: number;
    border?: string;
    background?: string;
    children: JSX.Element | string;
    rotateLeftOnClick?: boolean;
    onClick: () => void;
}

export default function RotatingButton({size, border, background, children, rotateLeftOnClick, onClick}: props){
    
    const angle = rotateLeftOnClick ? -90 : 90;  
    const containerRef = useRef(null);
    const contentRef = useRef(null);

    const onButtonClick = () => {
        onClick();
        rotate(containerRef.current, 0);
        rotate(contentRef.current, 0);
        rotate(containerRef.current, angle, 0.5);
        rotate(contentRef.current, -angle, 0.5);
    }

    const dimensions = size
    ? { width: size, height: size, borderRadius: 0.2 * size }
    : {};

    return (
        <Container
            ref={containerRef}
            style={{
                border: border?? "none", 
                background: background?? "none",
                ...dimensions
            }}
            onClick={onButtonClick}
        >
            <Content ref={contentRef}>
                {children}
            </Content>
        </Container>
    )
}