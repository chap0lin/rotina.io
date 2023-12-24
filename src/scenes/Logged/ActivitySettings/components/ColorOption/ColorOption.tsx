import { useEffect, useRef } from "react";
import { fade, rotate } from "src/functions/animation";
import { Check } from "react-feather";
import { colors } from "src/colors";
import { Box, Icon } from "./ColorOption.style";
import { useGlobalContext } from "src/contexts/GlobalContextProvider";

interface props {
    color: string;
    selected: boolean;
    onCLick: (color: string) => void;
}

export default function ColorOption({color, selected, onClick}){
    const { innerHeight } = useGlobalContext();
    const checkSize = innerHeight > 740 ? 20 : 16;
    const boxRef = useRef(null);
    const iconRef = useRef(null);

    useEffect(() => {
        fade(iconRef.current, 0);
        rotate(boxRef.current, -90, 0.25);
    }, []);

    useEffect(() => {
        fade(iconRef.current, (selected)? 1 : 0, 0.25);
        rotate(boxRef.current, (selected)? 0 : -90, 0.5);
    }, [selected]);
    
    return (
        <Box
            ref={boxRef}
            style={{background: color}}
            onClick={() => onClick(color)}
        >
            <Icon ref={iconRef}>
                <Check
                    color={colors.white}
                    strokeWidth={2}
                    width={checkSize}
                    height={checkSize}
                />
            </Icon>
        </Box>
    )
}