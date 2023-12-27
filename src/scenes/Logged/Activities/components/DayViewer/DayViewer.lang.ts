import { languageOption } from "src/types";

type textTypes = {
  allQuiethere: string;
};

const texts = new Map<languageOption, textTypes>();

texts.set("pt-br", {
  allQuiethere: "Tudo quieto por aqui."

});

texts.set("en-us", {
  allQuiethere: "All quiet here."

});

export { texts };
