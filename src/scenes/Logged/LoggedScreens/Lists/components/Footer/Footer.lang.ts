import { languageOption } from "src/types";

type textTypes = {
  items: string;
};

const texts = new Map<languageOption, textTypes>();

texts.set("pt-br", {
  items: "itens"
});

texts.set("en-us", {
  items: "items"
});

export { texts };
