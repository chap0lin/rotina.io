import { colors } from "src/colors";
import { timeType } from "src/types";
import { stringifyTime } from "src/functions/time";
import { Container, PlaceText, Placeholder, What, WhatAndWho, When, WhenAndWhere, Where, Who } from "./ActivityCard.style";

interface props {
    what?: string;
    who?: string;
    where?: string;
    startsAt?: timeType;
    endsAt?: timeType;
    color?: string;
    highlighted?: boolean;
    placeholder?: string | string[];
}

export default function ActivityCard({what, who, where, startsAt, endsAt, color, highlighted, placeholder}: props){
    
    const bgColor = color ?? colors.grey;

    const cardStyle = {
        background: highlighted? bgColor : "none",
        border: highlighted? "none" : `1px solid ${bgColor}`,
        color: highlighted? colors.white : bgColor,
    }

    const PlaceholderContent = () => {
        if(typeof placeholder === "string")
        return (
            <Placeholder style={cardStyle}>
                <PlaceText style={{color: cardStyle.color}}>
                    {placeholder}
                </PlaceText>
            </Placeholder>
        )
        return (
            <Placeholder style={cardStyle}>
                {placeholder.map((text, index) => (
                    <PlaceText key={index} style={{color: cardStyle.color}}>
                        {text}
                    </PlaceText>
                ))}
            </Placeholder>
        )        
    }

    if(placeholder) return (
        <PlaceholderContent />
    )
    
    return (
        <Container style={cardStyle}>
            <WhatAndWho>
                {what && <What style={{color: cardStyle.color}}>{what}</What>}
                {who && <Who style={{color: cardStyle.color}}>{who}</Who>}
            </WhatAndWho>
            <WhenAndWhere>
                <When style={{color: cardStyle.color}}>
                    {startsAt && stringifyTime(startsAt)}
                    {endsAt && " - " + stringifyTime(endsAt)}
                </When>
                {where && <Where style={{color: cardStyle.color}}>{where}</Where>}
            </WhenAndWhere>
        </Container>
    )
}