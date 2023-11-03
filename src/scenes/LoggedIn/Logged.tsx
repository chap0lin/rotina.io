import { useGlobalContext } from "src/contexts/GlobalContextProvider";
import { texts } from "./Logged.lang";
import { languageOption } from "src/types";
import { Plus } from "react-feather";
import { colors } from "src/colors";
import { ActivityCard, Background, Button, Header } from "src/components";
import { BigBold, SubTitle, BigTitle, MainContent, TopTexts, Section, SectionTitle, BottomContent } from "./Logged.style";

const date = new Date();
const dayIndex = date.getDay();

const getSubtitle = (language: languageOption) => {
    const subtitles = texts.get(language).placeholders;
    return subtitles[dayIndex];
}

export default function LoggedInScreen(){
    const { language, innerHeight } = useGlobalContext();
    const loggedTexts = texts.get(language);
    const subtitle = getSubtitle(language);

    return (
        <Background>
            <Header logo user lang/>
            <MainContent>
                <TopTexts>
                    <BigTitle>
                        {loggedTexts.todayIs}
                        &nbsp;
                        <BigBold>
                            {loggedTexts.days[dayIndex]}
                        </BigBold>
                    </BigTitle>
                    <SubTitle>
                        {subtitle}
                    </SubTitle>
                </TopTexts>
                <Section>
                    <SectionTitle>
                        {loggedTexts.happeningNow}
                    </SectionTitle>
                    <ActivityCard
                        highlighted={false}
                        placeholder={loggedTexts.nothingHappening}
                    />
                </Section>
                <Section>
                    <SectionTitle>
                        {loggedTexts.whatsNext}
                    </SectionTitle>
                    <ActivityCard
                        highlighted={false}
                        placeholder={loggedTexts.createActivity}
                    />
                </Section>
            </MainContent>
            <BottomContent>
                <Button
                    onClick={() => null}
                    padding={"17px"}
                    width={innerHeight > 750? "70px" : "60px"}
                    height={innerHeight > 750? "70px" : "60px"}
                    borderRadius={"40px"}
                >
                    <Plus
                        strokeWidth={2}
                        color={colors.white}
                        width={"100%"}
                        height={"100%"}
                    />
                </Button>
            </BottomContent>
        </Background>
    )
}