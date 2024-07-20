import { useGlobalContext } from "src/contexts/GlobalContextProvider";
import { Button } from "src/components";
import { listType } from "src/types";
import { texts } from "./CopyPopup.lang";
import { Container, Column, Text, Title, Options, Brief, Subtitle, InfoSection } from "./CopyPopup.style";
import { Copy } from "react-feather";
import { colors } from "src/colors";

interface props {
  list: listType;
}

export default function EditListPopup({list}: props){
  const { language, hidePopup, showPopup } = useGlobalContext();
  const popupTexts = texts.get(language);

  const onCopyRequest = async () => {
    let stringifiedList =`${list.name}:\n`
    list.items.forEach((item) => {
        stringifiedList += `- ${item.content}\n`;
    });
    console.log(stringifiedList);
    try{
      await navigator.clipboard.writeText(stringifiedList);
      hidePopup();
      setTimeout(() => showPopup({
          text: popupTexts.copySuccess,
          type: "warning-success"
      },{
          timeout: 4000
      }), 200);
    } catch {
      hidePopup();
      setTimeout(() => showPopup({
          text: popupTexts.copyError,
          type: "warning-failure"
      },{
          timeout: 4000
      }), 200);
    }
  }

  const onLinkRequest = async () => {
    
  }

  return (
    <Container>
        <Title>
          {popupTexts.share}
        </Title>
        <Text>
          {popupTexts.howTo}
        </Text>
        <Options>
          <Column>
            <InfoSection>
              <Subtitle>
                {popupTexts.text}
              </Subtitle>
              <Brief>
                {popupTexts.textBrief}
              </Brief>
            </InfoSection>
            <Button
              width="100%"
              onClick={onCopyRequest}
            >
              <Copy
                color={colors.darkWhite}
              />
            </Button>
          </Column>
          <Column>
            <InfoSection>
              <Subtitle>
                {popupTexts.link}
              </Subtitle>
              <Brief>
                {popupTexts.linkBrief}
              </Brief>
            </InfoSection>
            <Button
              width="100%"
              onClick={onLinkRequest}
              disabled
            >
              {popupTexts.soon}
            </Button>
          </Column>
        </Options>
    </Container>
  );
}