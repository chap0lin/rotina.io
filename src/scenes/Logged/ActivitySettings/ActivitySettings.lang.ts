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
  timesAreEqual: string;
  timesConflict: string;
  timesAreInverted: string;
  exampleActivity: activityType;
  daysOfTheWeek:string[];
  today: string;
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
    timesAreInverted: "Algo de errado não está certo.",
    timesConflict: "Conflito com outra atividade, que ocorre no intervalo ",
    timesAreEqual: "Os horários não podem ser iguais.",
    exampleActivity: {
      what: "Levar a vó ao Jiu-Jitsu",
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
    ],
    today: "hoje",
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
    timesAreInverted: "These times are incompatible.",
    timesConflict: "Conflict with another activity that happens at ",
    timesAreEqual: "Times cannot be equal.",
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
    ],
    today: "today",
});

export { texts };
