export type languageOption = "en-us" | "pt-br";

export type selectionType = {
  icon: string | JSX.Element;
  text: string | languageOption;
};

export type userType = {
  name: string;
  password: string;
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
};

export type popupType = "info" | "warning" | "warning-success" | "warning-alert" | "warning-failure" | "cookies";

export type dayType = {
  day: "monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | "sunday";
  activities: activityType[];
}

export type coordinateType = {
  x?: number;
  y?: number;
};

export type sizeType = {
  width?: number;
  height?: number;
};
