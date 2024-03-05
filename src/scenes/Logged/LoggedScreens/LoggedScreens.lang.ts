import { languageOption } from "src/types";

type textTypes = {
  sessionExpired: string;
  errorFetchingData: string;
  somethingWentWrong: string;
};

const texts = new Map<languageOption, textTypes>();

texts.set("pt-br", {
  sessionExpired: "Desculpe, mas sua sessão expirou. Por favor faça o login novamente.",
  somethingWentWrong: "Parece que alguma coisa deu errado. E se você tentar mais tarde?",
  errorFetchingData: "Sentimos muito, mas não foi possível obter suas informações no momento. E se você tentar mais tarde?",
});

texts.set("en-us", {
  sessionExpired: "Sorry, but your session has expired. Please log in again.",
  somethingWentWrong: "Looks like something went wrong. Maybe try again later?",
  errorFetchingData: "We're sorry, but it we couldn't fetch your data right now. Maybe try again later?",
});

export { texts };
