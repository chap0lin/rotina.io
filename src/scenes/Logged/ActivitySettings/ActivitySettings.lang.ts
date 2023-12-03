import { colors } from "src/colors";
import { activityType, languageOption } from "src/types";

type textTypes = {
  newActivity: string;
  editActivity: string;
  what: string;
  where: string;
  when: string;
  who: string;
  start: string;
  to: string;
  end: string;
  preview: string;
  exampleActivity: activityType;
  daysOfTheWeek:string[];
};

const texts = new Map<languageOption, textTypes>();

texts.set("pt-br", {
    newActivity: "Nova atividade rotineira",
    editActivity: "Editar atividade",
    what: "Qual o nome da atividade?",
    when: "Que dia?",
    who: "Com quem?",
    where: "Onde?",
    start: "Início",
    to: "até",
    end: "Fim",
    preview: "Pré-visualizar",
    exampleActivity: {
      what: "Levar Vovó ao Jiu-Jitsu",
      where: "espaço sideral",
      who: "Vovó Gertrudes",
      startsAt: {hour: 12, minute: 0},
      endsAt: {hour: 14, minute: 0},
      color: colors.blue,
    },
    daysOfTheWeek: [
      "Segunda",
      "Terça",
      "Quarta",
      "Quinta",
      "Sexta",
      "Sábado",
      "Domingo",
    ]
});

texts.set("en-us", {
    newActivity: "New routine activity",
    editActivity: "Edit activity",
    what: "What's the name?",
    who: "With who?",
    where: "Where?",
    when: "When?",
    start: "Start",
    to: "to",
    end: "End",
    preview: "Preview",
    exampleActivity: {
      what: "Take Granny to Jiu-Jitsu",
      where: "Outer Space",
      who: "Granny Gertrudes",
      startsAt: {hour: 12, minute: 0},
      endsAt: {hour: 14, minute: 0},
      color: colors.blue,
    },
    daysOfTheWeek: [
      "Monday",
      "Tueday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ]
});

export { texts };
