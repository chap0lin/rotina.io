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
    id: string;
    name: string;
    email: string;
    password: string;
  },
  app: {
    weekActivities: activityType[][];
    todoList: itemType[];
    shoppingList: itemType[];
  } 
};