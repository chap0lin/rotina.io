import { reactToClick, rotate } from "src/functions/animation";
import { Container, Content } from "./RotatingButton.style";
import { useEffect, useRef } from "react";

interface props {
    size?: number;
    border?: string;
    background?: string;
    children: JSX.Element | string;
    rotateDirection?: "left" | "right";
    rotateOnCondition?: any;
    onClick: () => void;
}

export default function RotatingButton({size, border, background, children, rotateDirection, rotateOnCondition, onClick}: props){
    
    const angle = rotateDirection ? (rotateDirection === "left"? -90 : 90) : 90;
    const containerRef = useRef(null);
    const contentRef = useRef(null);

    const rotateButton = () => {
        rotate(containerRef.current, 0);
        rotate(contentRef.current, 0);
        rotate(containerRef.current, angle, 0.5);
        rotate(contentRef.current, -angle, 0.5);
    }

    const onButtonClick = () => {
        onClick();
        if(rotateOnCondition != undefined) return;
        rotateButton();
    }

    useEffect(() => {
        if(rotateOnCondition != undefined) rotateButton();
    }, [rotateOnCondition]);

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