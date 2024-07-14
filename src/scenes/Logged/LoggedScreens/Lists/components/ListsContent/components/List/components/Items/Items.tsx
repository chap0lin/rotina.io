import { itemType } from "src/types";
import { colors } from "src/colors";
import { X } from "react-feather";
import { Container, Content, Line} from "./Items.style";

interface props {
    maxHeight?: number;
    source: itemType[];
    markColor?: string;
    onMark: (index: number) => void;
    onRemove: (index: number) => void;
}

export default function Items({maxHeight, source, markColor, onMark, onRemove}: props){

    return (
        <Container style={{maxHeight: maxHeight?? "100%"}}>
            {source && source.map(((item, index) => (
                <Line key={index}>
                    <X
                        style={{cursor: "pointer"}}
                        color={colors.grey}
                        width={"20px"}
                        height={"22px"}
                        onClick={() => onRemove(index)}
                    />
                    <Content
                        onClick={() => onMark(index)}
                        style={item.marked
                            ? {
                                color: markColor?? colors.black,
                                opacity: 0.3,
                                textDecoration: "line-through",
                            } : {
                                color: colors.black
                            }
                        }
                    >
                        {item.content}
                    </Content>
                </Line>
            )))}
        </Container>
    )
}