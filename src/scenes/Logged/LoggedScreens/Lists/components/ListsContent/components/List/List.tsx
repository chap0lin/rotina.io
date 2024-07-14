import { useGlobalContext } from "src/contexts/GlobalContextProvider";
import { listElementId } from "src/constants";
import { listType } from "src/types";
import { Items } from "./components";
import { texts } from "./List.lang";
import catYarn from "src/assets/images/cat-yarn.png";
import { Container, ListSection, TitleSection, Title, PlaceholderImage, PlaceholderTitle, PlaceholderText, PlaceholderImageSection, PlaceholderSection } from "./List.style";

interface props {
    list: listType;
    index?: number;
    maxHeight?: number;
    onCreate?: () => void;
    onEdit?: () => void;
    onMark?: (index: number) => void;
    onRemove?: (index: number) => void;
}

export default function List({maxHeight, list, index, onCreate, onEdit, onMark, onRemove}: props){
    const { language } = useGlobalContext();
    const listTexts = texts.get(language);

    const id = (list)? `${listElementId}${index}` : "not-a-list";
    const edit = (list)? onEdit : null; 

    if(list) return (
        <Container id={id}>
            <ListSection>
                <TitleSection onClick={edit}>
                    <Title style={{background: list.color}} onClick={edit}>
                        {list.name}
                    </Title>
                </TitleSection>
                    <Items
                        maxHeight={maxHeight}
                        source={list.items}
                        markColor={list.color}
                        onMark={onMark}
                        onRemove={onRemove}
                    />
            </ListSection>
        </Container>
    )

    return (
        <Container id={id}>
            <PlaceholderSection onClick={onCreate}>
                <PlaceholderTitle>
                    {listTexts.placeholderTitle}
                </PlaceholderTitle>
                <PlaceholderImageSection>
                    <PlaceholderImage src={catYarn}/>
                </PlaceholderImageSection>
                <PlaceholderText>
                    {listTexts.placeholderText}
                </PlaceholderText>
            </PlaceholderSection>
        </Container>
    )
}