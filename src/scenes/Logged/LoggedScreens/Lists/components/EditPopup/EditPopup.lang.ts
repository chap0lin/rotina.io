import { languageOption } from "src/types";

type textTypes = {
  properties: string;
  name: string;
  insertName: string;
  color: string;
  dangerZone: string;
  clear: string;
  delete: string;
  list: string;
  yep: string;
  nope: string;
};

const texts = new Map<languageOption, textTypes>();

texts.set("pt-br", {
  properties: "Propriedades",
  name: "Nome",
  insertName: "insira o nome da lista",
  color: "Cor",
  dangerZone: "Zona perigosa",
  clear: "limpar",
  delete: "apagar",
  list: "lista",
  yep: "sim",
  nope: "não",
});

texts.set("en-us", {
  properties: "Properties",
  name: "Name",
  insertName: "insert the list name",
  color: "Color",
  dangerZone: "Danger zone",
  clear: "clear",
  delete: "delete",
  list: "list",
  yep: "yep",
  nope: "nope",
});

export { texts };
