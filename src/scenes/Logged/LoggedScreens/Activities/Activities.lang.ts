import { languageOption } from "src/types";

type textTypes = {
  days: string[];
  manageActivities: string;
  activityDeleted: string;
};

const texts = new Map<languageOption, textTypes>();

texts.set("pt-br", {
  days: [
    "Segunda",
    "Terça",
    "Quarta",
    "Quinta",
    "Sexta", 
    "Sábado",
    "Domingo"
  ],
  manageActivities: "Gerenciar atividades",
  activityDeleted: "Atividade apagada.",
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
  activityDeleted: "Ativity deleted.",
});

export { texts };
