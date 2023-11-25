import { languageOption } from "src/types";

type textTypes = {
  todayIs: string;
  days: string[];
  placeholders: string[];
  happeningNow: string;
  whatsNext: string;
};

const texts = new Map<languageOption, textTypes>();

texts.set("pt-br", {
  todayIs: "Hoje é",
  days: [
    "Segunda!",
    "Terça!",
    "Quarta!",
    "Quinta!",
    "Sexta!",
    "Sábado!",
    "Domingo!",
  ],
  placeholders: [
    "A vida é uma montanha-russa e nós somos os gritos.",
    "A vida é um jogo e nós somos os peões.",
    "A vida é um livro e nós somos as vírgulas.",
    "A vida é um filme e nós somos os figurantes.",
    "A vida é um sonho e nós somos o despertador.",
    "A vida é uma festa e nós somos as piñatas.",
    "A vida é uma escola e nós somos os repetentes.",
  ],
  happeningNow: "Rolando agora",
  whatsNext: "A seguir",
});

texts.set("en-us", {
  todayIs: "Today is",
  days: [
    "Monday!",
    "Tuesday!",
    "Wednesday!",
    "Thursday!",
    "Friday!",
    "Saturday!",
    "Sunday!",
  ],
  placeholders: [
    "Life is a roller coaster and we are the screams.",
    "Life is a game and we are the pawns.",
    "Life is a book and we are the commas.",
    "Life is a movie and we are the extras.",
    "Life is a dream and we are the alarm.",
    "Life is a party and we are the piñatas.",
    "Life is a school and we are the repeaters.",
  ],
  happeningNow: "Happening now",
  whatsNext: "What's next",
});

export { texts };