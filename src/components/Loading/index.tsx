import { Loader } from "react-feather";
import { Background, Gsap, Text } from "./Loading.style";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { colors } from "../../colors";

export default function Loading(){
    
    const loaderRef = useRef(null);
    
    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            gsap.to(loaderRef.current, {
                rotate: 360,
                duration: 1.5,
                repeat: -1,
                ease: 'linear',
            });
        });
        return () => {
            ctx.revert();
        };
    }, []);

    return (
        <Background>
            <Text>
                Um momento...
            </Text>
            <Gsap ref={loaderRef}>
                <Loader
                    width={100}
                    height={100}
                    strokeWidth={1}
                    color={colors.black}
                />
            </Gsap>
        </Background>
    )
}