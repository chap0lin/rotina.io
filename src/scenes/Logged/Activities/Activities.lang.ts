import { languageOption } from "src/types";

type textTypes = {
  days: string[];
  manageActivities: string;
};

const texts = new Map<languageOption, textTypes>();

texts.set("pt-br", {
  days: ["Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado", "Domingo"],
  manageActivities: "Gerenciar atividades",
});

texts.set("en-us", {
  days: [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ],
  manageActivities: "Manage activities",
});

export { texts };
