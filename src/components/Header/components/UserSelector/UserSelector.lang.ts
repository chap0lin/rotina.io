import { languageOption } from "src/types";

type textTypes = {
  myData: string;
  settings: string;
  logoff: string;
};

const texts = new Map<languageOption, textTypes>();

texts.set("pt-br", {
  myData: "Meus dados",
  settings: "Ajustes",
  logoff: "Sair",
});

texts.set("en-us", {
  myData: "My data",
  settings: "Settings",
  logoff: "Logoff",
});

export { texts };
