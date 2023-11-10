import { useLayoutEffect, useRef } from "react";
import { Blurry } from "./Blur.style";
import { spawn, vanish } from "src/functions/animation";

interface props {
    show: boolean;
    onClick: () => void;
}

const TRANSITION_PERIOD = 0.25;

export default function Blur({show, onClick}: props){

    const blurRef = useRef(null);

    useLayoutEffect(() => {
        show
        ? spawn(blurRef.current, TRANSITION_PERIOD)
        : vanish(blurRef.current, TRANSITION_PERIOD);
    }, [show]);

    return <Blurry ref={blurRef} onClick={onClick}/>
}