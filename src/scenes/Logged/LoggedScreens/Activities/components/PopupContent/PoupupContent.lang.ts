import { languageOption } from "src/types";

type textTypes = {
  woah: string;
  question: string;
  confirm: string;
  no: string;
  yes: string;
  weekdays: string[];
};

const texts = new Map<languageOption, textTypes>();

texts.set("pt-br", {
  woah: "PERAÍ... É SÉRIO?",
  question: "Você está prestes a apagar esta atividade ",
  confirm: " Tem certeza disso?",
  no: "não, foi mal",
  yes: "Sim, apague",
  weekdays: [
    "das segundas.",
    "das terças.",
    "das quartas.",
    "das quintas.",
    "das sextas.",
    "dos sábados.",
    "dos domingos.",
  ],
});

texts.set("en-us", {
  woah: "WAIT... WHAT?",
  question: "You are about to wipe out this activity from ",
  confirm: " Are you sure?",
  no: "nope, go back",
  yes: "Yes, delete",
  weekdays: [
    "mondays.",
    "tuesdays.",
    "wednesdays.",
    "thursdays.",
    "fridays.",
    "saturdays.",
    "sundays.",
  ],
});

export { texts };
