import { AnimatedLoader, Background, Text } from "./Loading.style";
import { languageOption } from "src/types";
import { Loader } from "react-feather";
import { colors } from "src/colors";
import { texts } from "./Loading.lang";

interface props {
    lang: languageOption;
}

export default function Loading({lang}: props){
    return (
        <Background>
            <Text>
                {texts.get(lang).loading}
            </Text>
            <AnimatedLoader>
                <Loader
                    width={'100%'}
                    height={'100%'}
                    strokeWidth={1}
                    color={colors.black}
                />
            </AnimatedLoader>
        </Background>
    )
}