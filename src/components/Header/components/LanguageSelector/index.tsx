import { languageOption, selectionType } from "src/types";
import brazilFlag from "assets/icons/brazil.png";
import usaFlag from "assets/icons/usa.png";
import Selector from "../Selector";

const languages: selectionType[] = [
  {
    icon: brazilFlag,
    text: "pt-br",
  }, {
    icon: usaFlag,
    text: "en-us",
  }
]

interface props {
  show: boolean;
  onClick: (lang: languageOption) => void;
}

export default function LanguageSelector({show, onClick}: props){
  return (
    <Selector
      optionList={languages}
      onClick={onClick}
      show={show}
    />
  )
}