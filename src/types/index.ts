export type languageOption = "en-us" | "pt-br";

export type selectionType = {
  icon: string | JSX.Element;
  text: string | languageOption;
};

export type timeType = {
  hour: number;
  minute: number;
};

export type activityType = {
  what: string;
  who: string;
  where: string;
  startsAt: timeType;
  endsAt: timeType;
  color: string;
  notes: string[];
};

export type popupType =
  | "info"
  | "prompt"
  | "warning-success"
  | "warning-alert"
  | "warning-failure"
  | "cookies";

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

export type dataType = "week" | "lists";
export type loginScreens = "sign-in" | "sign-up" | "forgot-password" | "sent-code-activate" | "sent-code-recovery";
export type loggedScreens = "dashboard" | "lists" | "activities" | "activity-settings";

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
  x?: number;
  y?: number;
};

export type sizeType = {
  width?: number;
  height?: number;
};

export type itemType = {
  content: string;
  marked: boolean;
};


export type listType = {
  name: string;
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