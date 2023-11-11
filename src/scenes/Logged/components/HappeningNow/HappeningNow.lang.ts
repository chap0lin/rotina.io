import { languageOption } from "src/types";

type textTypes = {
  notes: string;
  nothingHappening: string[];
};

const texts = new Map<languageOption, textTypes>();

texts.set("pt-br", {
  notes: "notas",
  nothingHappening: ["No momento, nada.", "Parece que você está livre!"],
});

texts.set("en-us", {
  notes: "notes",
  nothingHappening: ["Well, nothing.", "Looks like you're free!"],
});

export { texts };
