import { languageOption } from "src/types";

type textTypes = {
  allQuiethere: string;
  today: string;
};

const texts = new Map<languageOption, textTypes>();

texts.set("pt-br", {
  allQuiethere: "Tudo quieto por aqui.",
  today: "HOJE",
});

texts.set("en-us", {
  allQuiethere: "All quiet here.",
  today: "TODAY",
});

export { texts };
