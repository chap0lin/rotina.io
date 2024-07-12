import { AnimatedLoader, Container, Text } from "./Loading.style";
import { Loader } from "react-feather";
import { colors } from "src/colors";
import { texts } from "./Loading.lang";
import { useGlobalContext } from "src/contexts/GlobalContextProvider";

export default function Loading() {
  const { language } = useGlobalContext();

  return (
    <Container>
      <Text>{texts.get(language).loading}</Text>
      <AnimatedLoader>
        <Loader
          width={"100%"}
          height={"100%"}
          strokeWidth={1}
          color={colors.black}
        />
      </AnimatedLoader>
    </Container>
  );
}
