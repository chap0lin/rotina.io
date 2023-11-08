import { languageOption, selectionType } from "src/types";
import brazilFlag from "assets/icons/brazil.png";
import usaFlag from "assets/icons/usa.png";
import Selector from "../Selector";
import { Coffee, Power, Sliders } from "react-feather";
import { colors } from "src/colors";

const languages: selectionType[] = [
  {
    icon: <Coffee color={colors.darkWhite} width={15} height={15}/>,
    text: "Meus dados",
  }, {
    icon: <Sliders color={colors.darkWhite} width={15} height={15}/>,
    text: "ajustes",
  }, {
    icon: <Power color={colors.pink} width={15} height={15}/>,
    text: "Sair",
  }
]

interface props {
  show: boolean;
  onClick: (option: string) => void;
}

export default function UserSelector({show, onClick}: props){
  return (
    <Selector
      optionList={languages}
      onClick={onClick}
      show={show}
    />
  )
}