import { useGlobalContext } from "src/contexts/GlobalContextProvider";
import { useNavigate } from "react-router-dom";
import { selectionType } from "src/types";
import { Selector } from "../index";
import { colors } from "src/colors";
import { texts } from "./UserSelector.lang";
import { Coffee, Power, Sliders } from "react-feather";

interface props {
  show: boolean;
  onClick: (option: string) => void;
}

export default function UserSelector({show, onClick}: props){
  const { language } = useGlobalContext();
  const userTexts = texts.get(language);
  const navigate = useNavigate();

  const options: selectionType[] = [
    {
      icon: <Coffee color={colors.darkWhite} width={15} height={15}/>,
      text: userTexts.myData,
    }, {
      icon: <Sliders color={colors.darkWhite} width={15} height={15}/>,
      text: userTexts.settings,
    }, {
      icon: <Power color={colors.pink} width={15} height={15}/>,
      text: userTexts.logoff,
    }
  ]

  const onOptionClick = (option: string) => {
    switch(option){
      case (userTexts.myData):
      case (userTexts.settings):
        //TODO implement functionalities for cases above
        onClick(option);
      break;
      case (userTexts.logoff):
        navigate("/login");
      break;
    }
  }

  return (
    <Selector
      optionList={options}
      onClick={onOptionClick}
      show={show}
    />
  )
}