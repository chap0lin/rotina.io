import { colors } from "src/colors";
import { Container, PlaceText, Placeholder } from "./ActivityCard.style";

interface props {
    what?: string;
    who?: string;
    where?: string;
    when?: string;
    color?: string;
    highlighted?: boolean;
    placeholder?: string | string[];
}

export default function ActivityCard({what, who, where, when, color, highlighted, placeholder}: props){
    
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
        </Container>
    )
}