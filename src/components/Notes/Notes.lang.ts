import { languageOption } from "src/types";

type textTypes = {
  title: string;
  placeholder: string;
};

const texts = new Map<languageOption, textTypes>();

texts.set("pt-br", {
  title: "Notas",
  placeholder: "Insira uma nota aqui...",
});

texts.set("en-us", {
  title: "Notes",
  placeholder: "Insert a note here...",
});

export { texts };
