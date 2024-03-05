import { useGlobalContext } from "src/contexts/GlobalContextProvider";
import { useLoggedContext } from "src/contexts/LoggedContextProvider";
import { useNavigate } from "react-router-dom";
import { selectionType } from "src/types";
import { tokenKey } from "src/constants";
import { Selector } from "../index";
import { colors } from "src/colors";
import { texts } from "./UserSelector.lang";
import { postRequest } from "src/functions/connection";
import { emptyStorage, getFromStorage } from "src/functions/storage";
import { List, Calendar, Power, Plus } from "react-feather";

interface props {
  show: boolean;
  onClick: (option: string) => void;
}

export default function UserSelector({ show, onClick }: props) {
  const { language, rollingCode } = useGlobalContext();
  const { goTo } = useLoggedContext();
  const userTexts = texts.get(language);
  const navigate = useNavigate();

  const options: selectionType[] = [
    {
      icon: <Calendar color={colors.darkWhite} width={15} height={15} />,
      text: userTexts.myWeek,
    },
    {
      icon: <List color={colors.darkWhite} width={15} height={15} />,
      text: userTexts.myLists,
    },
    {
      icon: <Plus color={colors.darkWhite} width={15} height={15} />,
      text: userTexts.activity,
    },
    {
      icon: <Power color={colors.pink} width={15} height={15} />,
      text: userTexts.logout,
    },
  ];

  const onOptionClick = (option: string) => {
    switch (option) {
      case userTexts.myLists:
        goTo("lists");
        onClick(option);
        break;
      case userTexts.myWeek:
        goTo("activities");
        onClick(option);
        break;
      case userTexts.activity:
        goTo("activity-settings");
        onClick(option);
        break;
      case userTexts.logout:
        const token = getFromStorage(tokenKey);
        if(token){
          const link = "/logout";
          const params = { rollingCode };
          postRequest({link, params, token});
          emptyStorage();
        }
        navigate("/login");
        break;
    }
  };

  return <Selector optionList={options} onClick={onOptionClick} show={show} />;
}
