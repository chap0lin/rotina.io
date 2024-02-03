import { languageOption } from "src/types";

type textTypes = {
  week: string;
  lists: string;
};

const texts = new Map<languageOption, textTypes>();

texts.set("pt-br", {
  week: "semana",
  lists: "listas",
});

texts.set("en-us", {
  week: "week",
  lists: "lists",
});

export { texts };
