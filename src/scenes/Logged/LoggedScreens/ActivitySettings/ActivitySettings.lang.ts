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
  to2: string;
  end: string;
  preview: string;
  conflictCause: string;
  errorCause: string;
  timesAreEqual: string;
  timesConflict: string;
  timesAreInverted: string;
  exampleActivity: activityType;
  daysOfTheWeek: string[];
  today: string;
  activityCreated: string;
  activityUpdated: string;
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
  to2: "às",
  end: "Fim",
  preview: "Pré-visualizar",
  conflictCause: "conflito",
  errorCause: "erro",
  timesAreInverted: "Os horários estão invertidos.",
  timesConflict: "Outra atividade ocorre de ",
  timesAreEqual: "Os horários não podem ser iguais.",
  exampleActivity: {
    what: "Levar a vó ao Jiu-Jitsu",
    where: "espaço sideral",
    who: "Vovó Gertrudes",
    startsAt: { hour: 12, minute: 0 },
    endsAt: { hour: 14, minute: 0 },
    color: colors.blue,
    notes: [],
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
  activityCreated: "Atividade criada!",
  activityUpdated: "Atividade atualizada!",
});

texts.set("en-us", {
  newActivity: "New routine activity",
  editActivity: "Edit activity",
  what: "What's the activity name?",
  who: "With whom?",
  where: "Where?",
  when: "When?",
  start: "Start",
  to: "to",
  to2: "-",
  end: "End",
  preview: "Preview",
  conflictCause: "Conflict",
  errorCause: "Error",
  timesAreInverted: "The times are inverted.",
  timesConflict: "Another activity happens from ",
  timesAreEqual: "Times cannot be equal.",
  exampleActivity: {
    what: "Take Granny to Jiu-Jitsu",
    where: "Outer Space",
    who: "Granny Gertrudes",
    startsAt: { hour: 12, minute: 0 },
    endsAt: { hour: 14, minute: 0 },
    color: colors.blue,
    notes: [],
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
  activityCreated: "Activity created!",
  activityUpdated: "Activity updated!",
});

export { texts };
