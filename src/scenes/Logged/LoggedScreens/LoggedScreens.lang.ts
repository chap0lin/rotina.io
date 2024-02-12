import { languageOption } from "src/types";

type textTypes = {
  errorFetchingData: string;
  somethingWentWrong: string;
};

const texts = new Map<languageOption, textTypes>();

texts.set("pt-br", {
  somethingWentWrong:
    "Parece que alguma coisa deu errado. E se você tentar mais tarde?",
  errorFetchingData:
    "Sentimos muito, mas não foi possível obter suas informações no momento. E se você tentar mais tarde?",
});

texts.set("en-us", {
  somethingWentWrong: "Looks like something went wrong. Maybe try again later?",
  errorFetchingData:
    "We're sorry, but it we couldn't fetch your data right now. Maybe try again later?",
});

export { texts };
