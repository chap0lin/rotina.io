import { languageOption } from "src/types";

type textTypes = {
  ok: string;
  hello: string;
  welcome: string;
  activationWasSuccessful: string;
};

const texts = new Map<languageOption, textTypes>();

texts.set("pt-br", {
  ok: "pode deixar!",
  hello: "Olá",
  welcome: "Seja bem vindo!",
  activationWasSuccessful:
    "Sua conta foi criada com sucesso e está pronta para uso. Experimente fazer o login agora!",
 });

texts.set("en-us", {
  ok: "all right!",
  hello: "Hi",
  welcome: "Welcome aboard!",
  activationWasSuccessful:
    "Your Routine.io account has been created successfuly and is now ready to go! Try to sign in now!",
});

export { texts };
