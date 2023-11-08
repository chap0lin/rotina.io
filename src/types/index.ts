export type languageOption = "en-us" | "pt-br";

export type selectionType = {
    icon: string | JSX.Element;
    text: string | languageOption;
}

export type userType = {
    name: string,
    password: string,
}

export type timeType = {
    hour: number,
    minute: number,
}

export type ActivityType = {
    what: string;
    who: string;
    where: string;
    startsAt: timeType;
    endsAt: timeType;
    color: string;
}