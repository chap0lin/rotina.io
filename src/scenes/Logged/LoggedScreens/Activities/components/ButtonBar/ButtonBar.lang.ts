import { languageOption } from "src/types";

type textTypes = {
  new: string;
};

const texts = new Map<languageOption, textTypes>();

texts.set("pt-br", {
  new: "nova",
});

texts.set("en-us", {
  new: "new",
});

export { texts };
