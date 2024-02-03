import { languageOption } from "src/types";

type textTypes = {
  woah: string;
  allGood: string;
  focus: string;
  confirmDiscard: string;
  confirmConfim: string;
  happeningAt: string;
  yesDiscard: string;
  noDiscard: string;
  yesConfirm: string;
  noConfirm: string;
  weekdays: string[];
};

const texts = new Map<languageOption, textTypes>();

texts.set("pt-br", {
  woah: "Opa!",
  allGood: "TUDO CERTO?",
  focus: "foco",
  confirmDiscard:
    "Todo o seu trabalho aqui será descartado. Tem certeza disso?",
  happeningAt: "Esta atividade vai rolar ",
  confirmConfim: " Podemos finalizar?",
  yesDiscard: "sim, descartar",
  noDiscard: "não, voltar",
  yesConfirm: "Manda ver!",
  noConfirm: "ainda não",
  weekdays: [
    "às segundas.",
    "às terças.",
    "às quartas.",
    "às quintas.",
    "às sextas.",
    "aos sábados.",
    "aos domingos.",
  ],
});

texts.set("en-us", {
  woah: "Woah!",
  allGood: "ALL GOOD?",
  focus: "focus",
  confirmDiscard: "All your work made here will be discarded. Are you certain?",
  happeningAt: "This activity will happen every ",
  confirmConfim: " Can we finish?",
  yesDiscard: "yes, discard",
  noDiscard: "nope, go back",
  yesConfirm: "You betcha!",
  noConfirm: "not yet",
  weekdays: [
    "monday.",
    "tuesday.",
    "wednesday.",
    "thursday.",
    "friday.",
    "saturday.",
    "sunday.",
  ],
});

export { texts };
