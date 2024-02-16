import { languageOption } from "src/types";

type textTypes = {
  days: string[];
  yourRoutine: string;
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
  yourRoutine: "Sua rotina",
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
  yourRoutine: "Your routine",
  activityDeleted: "Ativity deleted.",
});

export { texts };
