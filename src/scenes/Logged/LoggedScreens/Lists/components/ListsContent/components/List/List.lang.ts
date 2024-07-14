import { colors } from "src/colors";
import { activityType, languageOption } from "src/types";

type textTypes = {
  placeholderTitle: string;
  placeholderText: string;
};

const texts = new Map<languageOption, textTypes>();

texts.set("pt-br", {
  placeholderTitle: "Suas listas ficam aqui",
  placeholderText: "Este espaço é para colocar as suas listas. Sejam elas de compras, afazeres, aniversários, sequência de academia ou a ordem de bom dia para suas plantas.",
});

texts.set("en-us", {
  placeholderTitle: "Your lists will show here",
  placeholderText: "This space is for placing your lists, whatever the purpose: for groceries, chores, birthdays, workout sessions or the good morning order for your plants.",
});

export { texts };
