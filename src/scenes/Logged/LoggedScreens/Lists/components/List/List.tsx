import { itemType } from "src/types";
import { colors } from "src/colors";
import { X } from "react-feather";
import { Container, Content, Items, Line} from "./List.style";

interface props {
    top: number | string;
    maxHeight?: number;
    source: itemType[];
    markColor?: string; 
    placeholder?: JSX.Element | string;
    onMark: (index: number) => void;
    onRemove: (index: number) => void;
}

export default function List({top, maxHeight, source, markColor, placeholder, onMark, onRemove}: props){

    return (
        <Container style={{top}}>
            <Items style={{maxHeight: maxHeight?? "100%"}}>
                {(source.length > 0) && source.map(((item, index) => (
                    <Line key={index}>
                        <X
                            style={{cursor: "pointer"}}
                            color={colors.grey}
                            width={"20px"}
                            height={"20px"}
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
            </Items>
            {!source.length && placeholder}
        </Container>
    )
}