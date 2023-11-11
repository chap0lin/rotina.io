import { useGlobalContext } from "src/contexts/GlobalContextProvider";
import { Text } from "./Logo.style";

interface props {
  color?: string;
  fontSize: number;
}

export default function Logo({ color, fontSize }: props) {
  const { language } = useGlobalContext();

  const logoProps = {
    color,
    fontSize,
    height: fontSize,
  };

  return (
    <Text style={logoProps}>
      {language === "pt-br" ? "Rotina.io" : "Routine.io"}
    </Text>
  );
}
