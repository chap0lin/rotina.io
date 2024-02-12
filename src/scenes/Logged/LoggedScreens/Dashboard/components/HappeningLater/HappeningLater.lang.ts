import { languageOption } from "src/types";

type textTypes = {
  createActivity: string | string[];
};

const texts = new Map<languageOption, textTypes>();

texts.set("pt-br", {
  createActivity: ["deseja criar algo novo?", "nova atividade"],
});

texts.set("en-us", {
  createActivity: ["wanna create something?", "new activity"],
});

export { texts };
