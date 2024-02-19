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
  | "SUCCESS_LOGGED_IN"
  | "SUCCESS_ACTIVATING_USER"
  | "SUCCESS_RECOVERING_USER"
  | "SUCCESS_DATA"
  | "SUCCESS_UPDATE" 
  | "SUCCESS_ACCESS_TOKEN"
  | "SUCCESS_REFRESH_TOKEN"
  | "SUCCESS_LOGGED_OUT"
  | "ERROR" 
  | "ERROR_AUTHENTICATION"
  | "ERROR_EMAIL_ALREADY_TAKEN"
  | "ERROR_USERNAME_ALREADY_TAKEN"
  | "ERROR_NO_REGISTERED_USER" 
  | "ERROR_MISSING_CREDENTIALS" 
  | "ERROR_INVALID_DATA"
  | "ERROR_NO_TOKENS_FOUND"
  | "ERROR_INVALID_ACCESS_TOKEN"
  | "ERROR_INVALID_REFRESH_TOKEN"
;

export type tokenType = "access" | "refresh"; 
export type dataType = "week" | "todo" | "shopping";
export type loginScreens = "sign-in" | "sign-up" | "forgot-password" | "sent-sign-up-email" | "sent-recovery-email";
export type loggedScreens = "dashboard" | "lists" | "activities" | "activity-settings";

export type serverReplyType = {
  status: statusType;
  data?: dataType;
  content?: string;
  accessToken?: string;
  refreshToken?: string;
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

export type userType = {
  auth: {
    token: string;
  },
  app: {
    weekActivities: activityType[][];
    todoList: itemType[];
    shoppingList: itemType[];
  } 
};

export type timeCheckType = {
  cause: string;
  message: string;
}