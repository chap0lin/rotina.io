import { useGlobalContext } from "src/contexts/GlobalContextProvider";
import { selectionType } from "src/types";
import { Selector } from "../index";
import { colors } from "src/colors";
import { Coffee, Power, Sliders } from "react-feather";
import { texts } from "./UserSelector.lang";


interface props {
  show: boolean;
  onClick: (option: string) => void;
}

export default function UserSelector({show, onClick}: props){
  const { language } = useGlobalContext();

  const options: selectionType[] = [
    {
      icon: <Coffee color={colors.darkWhite} width={15} height={15}/>,
      text: texts.get(language).myData,
    }, {
      icon: <Sliders color={colors.darkWhite} width={15} height={15}/>,
      text: texts.get(language).settings,
    }, {
      icon: <Power color={colors.pink} width={15} height={15}/>,
      text: texts.get(language).logoff,
    }
  ]

  return (
    <Selector
      optionList={options}
      onClick={onClick}
      show={show}
    />
  )
}