import { languageOption } from "../../types";

type textTypes = {
    ok: string;
    hello: string;
    hmmm: string;
    welcome: string;
    goBack: string;
    activationWasSuccessful: string;
    somethingWentWrong: string;
}

const texts = new Map<languageOption, textTypes>();

texts.set('pt-br', {
    ok: "pode deixar!",
    hello: "Olá",
    hmmm: "Hmmm...",
    welcome: "Seja bem vindo!",
    goBack: "voltar",
    activationWasSuccessful: "Sua conta por aqui foi criada com sucesso e está pronta para uso. Experimente fazer o login agora!",
    somethingWentWrong: "Parece que alguma coisa deu errado. E se você tentar mais tarde?"
})

texts.set('en-us', {
    ok: "all right!",
    hello: "Hi",
    hmmm: "Hmmm...",
    welcome: "Welcome aboard!",
    goBack: "go back",
    activationWasSuccessful: "Your account has been successfuly created and is now ready to go! Try signing in now!",
    somethingWentWrong: "Looks like something went wrong. Maybe try again later?"
})

export { texts };

