import { languageOption } from "src/types";

type textTypes = {
  dangerZone: string;
  clear: string;
  delete: string;
  list: string;
  yep: string;
  nope: string;
};

const texts = new Map<languageOption, textTypes>();

texts.set("pt-br", {
  dangerZone: "Zona perigosa",
  clear: "limpar",
  delete: "apagar",
  list: "lista",
  yep: "sim",
  nope: "não",
});

texts.set("en-us", {
  dangerZone: "Danger zone",
  clear: "clear",
  delete: "delete",
  list: "list",
  yep: "yep",
  nope: "nope",
});

export { texts };
