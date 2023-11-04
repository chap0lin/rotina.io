import { useEffect, useState } from "react";
import { useGlobalContext } from "src/contexts/GlobalContextProvider";
import { ActivityType, languageOption, timeType } from "src/types";
import { texts } from "./Logged.lang";
import { colors } from "src/colors";
import { useTime } from "src/hooks/time";
import { isAfter, isBefore } from "src/functions/time";
import { ActivityCard, Background, Header } from "src/components";
import RoundButton from "./components/RoundButton";
import { BigBold, SubTitle, BigTitle, MainContent, TopTexts, Section, SectionTitle, SectionContent, SectionSpacer } from "./Logged.style";

const date = new Date();
const dayIndex = date.getDay();

const getSubtitle = (language: languageOption) => {
    const subtitles = texts.get(language).placeholders;
    return subtitles[dayIndex];
}

const getLaterActivities = (activities: ActivityType[], now: timeType) => {
    return activities.filter((act) => isAfter(act.startsAt, now));
}

//just dummy purposes///////////////////////////////////////////////////////

const dummyActivities: ActivityType[] = [
    {
        what: "Organização e Arquitetura de Computadores",
        who: "Carla Koike",
        where: "PAT AT 030",
        startsAt: {hour: 20, minute: 0},
        endsAt: {hour: 21, minute: 50},
        color: colors.red,
    }, {
        what: "Elementos de automação",
        who: "Guilherme Caribé",
        where: "GRACO B1",
        startsAt: {hour: 18, minute: 0},
        endsAt: {hour: 19, minute: 50},
        color: colors.green,
    }
]


/////////////////////////////////////////////////////////////////////////////


export default function LoggedInScreen(){
    const { language, innerHeight } = useGlobalContext();
    const [ activities, setActivities ] = useState<ActivityType[]>(() => dummyActivities);
    const [ happeningNow, setHappeningNow ] = useState<ActivityType | undefined>();
    const [ hour, minute ] = useTime();

    const loggedTexts = texts.get(language);
    const subtitle = getSubtitle(language);
    const laterActivities = getLaterActivities(activities, {hour, minute});

    const HappeningActivity = () => {
        if(happeningNow) return <ActivityCard {...happeningNow} highlighted/>
        return <ActivityCard placeholder={loggedTexts.nothingHappening}/>
    }

    useEffect(() => {
        setHappeningNow(activities.filter((act) => {
            return (
                isBefore(act.startsAt, {hour, minute}) &&
                isAfter(act.endsAt, {hour, minute})
            )
        }).at(0));
    }, [activities, hour, minute]);

    return (
        <Background>
            <Header logo user/>
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
                    <SectionContent>
                        <HappeningActivity />
                    </SectionContent>
                </Section>
                <Section>
                    <SectionTitle>
                        {loggedTexts.whatsNext}
                    </SectionTitle>
                    <SectionContent>
                        {laterActivities.map((act, index) => (
                            <ActivityCard
                                {...act}
                                key={index}
                            />
                        ))}
                        <ActivityCard
                            highlighted={false}
                            placeholder={loggedTexts.createActivity}
                        />
                        <SectionSpacer/>
                    </SectionContent>
                </Section>
            </MainContent>
            <RoundButton onClick={() => null}/>
        </Background>
    )
}