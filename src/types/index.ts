export type languageOption = "en-us" | "pt-br";

export type dayType = {
  day:
    | "monday"
    | "tuesday"
    | "wednesday"
    | "thursday"
    | "friday"
    | "saturday"
    | "sunday";
  activities: activityType[];
};

export type statusType = 
  | "SUCCESS"
  | "SUCCESS_CODE"
  | "SUCCESS_LOGGED_IN"
  | "SUCCESS_ACTIVATING_USER"
  | "SUCCESS_RECOVERING_USER"
  | "SUCCESS_DATA"
  | "SUCCESS_UPDATE" 
  | "SUCCESS_TOKEN"
  | "SUCCESS_LOGGED_OUT"
  | "SUCCESS_VALID_PURPOSE"
  | "SUCCESS_REGISTERED_USER"
  | "SUCCESS_RECOVERED_USER"
  | "ERROR"
  | "ERROR_EMAIL"
  | "ERROR_INTERNAL"
  | "ERROR_BAD_REQUEST"
  | "ERROR_INVALID_PURPOSE"
  | "ERROR_AUTHENTICATION"
  | "ERROR_EMAIL_ALREADY_TAKEN"
  | "ERROR_USERNAME_ALREADY_TAKEN"
  | "ERROR_DUPLICATE_USER"
  | "ERROR_NO_REGISTERED_USER" 
  | "ERROR_NO_ACTIVATING_USER"
  | "ERROR_NO_RECOVERING_USER"
  | "ERROR_MISSING_CREDENTIALS" 
  | "ERROR_INVALID_DATA"
  | "ERROR_NO_TOKENS_FOUND"
  | "ERROR_INVALID_TOKEN"
  | "ERROR_NO_TOKEN_PROVIDED_BY_SERVER"
;

export type loginScreens = "sign-in" | "sign-up" | "forgot-password" | "sent-code-activate" | "sent-code-recovery";
export type loggedScreens = "dashboard" | "lists" | "activities" | "activity-settings";
export type dataType = "week" | "lists";
export type popupDisplayType = { type: "info" | "prompt" | "warning-success" | "warning-alert" | "warning-failure" | "cookies" };
export type heightType = { height?: number };
export type textType = { text: string | JSX.Element };
export type visibilityType = { visible: boolean };
export type whatType = { what: string };
export type whereType = { where: string };
export type whoType = { who: string };
export type startType = { startsAt: timeType };
export type endType = { endsAt: timeType };
export type colorType = { color: string };
export type notesType = { notes: string[] };

export type selectionType = {
  icon: string | JSX.Element;
  text: string | languageOption;
};

export type timeType = {
  hour: number;
  minute: number;
};

export type popupType = 
  & popupDisplayType
  & textType
  & visibilityType
  & heightType
;

export type activityType = 
  & whatType
  & whoType
  & whereType
  & startType
  & endType
  & colorType
  & notesType
;

export type activityPropsType =   // argumentos para funções usadas no projeto
  | whatType
  | whereType
  | whoType
  | startType
  | endType
  | colorType
;

export type popupPropsType =      // argumentos para funções usadas no projeto
  | popupDisplayType
  | textType
  | visibilityType
  | heightType
;


export type serverReplyType = {
  status: statusType;
  data?: dataType;
  content?: string;
  token?: string;
  rollingCode?: string;
};

export type activitySelectionType = {
  activity: activityType;
  day: number;
};

export type coordinateType = {
  x?: number | string;
  y?: number | string;
};

export type sizeType = {
  width?: number | string;
  height?: number | string;
};

export type itemType = {
  content: string;
  marked: boolean;
};


export type listType = {
  name: string;
  color: string;
  items: itemType[];
}

export type userType = {
  auth: {
    token: string;
  },
  app: {
    weekActivities: activityType[][];
    lists: listType[];
  } 
};

export type timeCheckType = {
  cause: string;
  message: string;
}