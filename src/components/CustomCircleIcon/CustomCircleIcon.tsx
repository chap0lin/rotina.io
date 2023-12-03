import { Circle, Icon } from "react-feather";
import { Item, Stack } from "./CustomCircleIcon.style";

interface props {
    innerIcon: Icon,
    width: number,
    height: number,
    strokeWidth: number,
    color: string,
    sizeRatio?: number,
}

const DEFAULT_SIZE_RATIO = 0.5;

export default function CustomCircleIcon({innerIcon, width, height, strokeWidth, color, sizeRatio}: props){
    const ratio = sizeRatio?? DEFAULT_SIZE_RATIO;

    const iconProps = {
        color,
        width,
        height,
        strokeWidth,
    }

    const checkProps = {
        color,
        width: ratio * iconProps.width,
        height: ratio * iconProps.height,
        strokeWidth: iconProps.strokeWidth / ratio,
    }

    const InnerIcon = innerIcon;

    return (
        <Stack style={{...iconProps}}>
            <Item style={{...iconProps}}>
                <Circle {...iconProps}/>
            </Item>
            <Item style={{...iconProps}}>
                <InnerIcon {...checkProps}/>
            </Item>
        </Stack>
    )
}