import { languageOption } from "src/types";

type textTypes = {
  myLists: string;
  myWeek: string;
  activity: string;
  logout: string;
};

const texts = new Map<languageOption, textTypes>();

texts.set("pt-br", {
  myLists: "Listas",
  myWeek: "Semana",
  activity: "Atividade",
  logout: "Sair",
});

texts.set("en-us", {
  myLists: "Lists",
  myWeek: "Week",
  activity: "Activity",
  logout: "Logout",
});

export { texts };
