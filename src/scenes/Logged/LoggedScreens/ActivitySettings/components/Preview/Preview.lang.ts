import { languageOption } from "src/types";

type textTypes = {
  yes: string;
  nope: string;
};

const texts = new Map<languageOption, textTypes>();

texts.set("pt-br", {
  yes: "confirmar",
  nope: "descartar",
});

texts.set("en-us", {
  yes: "",
  nope: "discard",
});

export { texts };
