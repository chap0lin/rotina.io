import { languageOption } from "src/types";

type textTypes = {
  createActivity: string[];
};

const texts = new Map<languageOption, textTypes>();

texts.set("pt-br", {
  createActivity: [
    "Quer criar uma nova atividade?",
    "Basta acessar sua semana.",
  ],
});

texts.set("en-us", {
  createActivity: ["Wanna create a new activity?", "Just access your week."],
});

export { texts };
