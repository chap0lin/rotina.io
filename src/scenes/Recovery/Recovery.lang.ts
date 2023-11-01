import { languageOption } from "src/types";

type textTypes = {
    ok: string;
    yey: string;
    hmmm: string;
    send: string;
    goBack: string;
    goodToGo: string;
    password: string;
    repeatPassword: string;
    createNewPassword: string;
    newPasswordHint: string;
    passwordMustBeNew: string;
    passwordsDontMatch: string;
    passwordChangeWasSuccessful: string;
    somethingWentWrong: string;
}

const texts = new Map<languageOption, textTypes>();

texts.set('pt-br', {
    ok: "pode deixar!",
    yey: "Oba!",
    hmmm: "Hmmm...",
    send: "enviar",
    goBack: "voltar",
    goodToGo: "tudo certo!",
    password: 'Senha',
    repeatPassword: 'Repetir senha',
    createNewPassword: "Crie uma nova senha",
    newPasswordHint: 'inclua no mínimo 8 caracteres, sendo pelo menos um deles especial.',
    passwordsDontMatch: 'as senhas não coincidem.',
    passwordMustBeNew: 'não pode ser igual à anterior.',
    passwordChangeWasSuccessful: "A senha da sua conta foi alterada com sucesso. Experimente fazer o login agora!",
    somethingWentWrong: "Parece que alguma coisa deu errado. E se você tentar mais tarde?"
})

texts.set('en-us', {
    ok: "all right!",
    yey: "Yey!",
    hmmm: "Hmmm...",
    send: "send",
    goBack: "go back",
    goodToGo: "all good!",
    password: 'Password',
    repeatPassword: 'Repeat password',
    createNewPassword: "Set a new password",
    newPasswordHint: 'password must be at least 8 characters long, with at least one special.',
    passwordsDontMatch: `the passwords don't match.`,
    passwordMustBeNew: "can't be equal to the last.",
    passwordChangeWasSuccessful: "Your account password has been successfuly changed! Try signing in now!",
    somethingWentWrong: "Looks like something went wrong. Maybe try again later?"
})

export { texts };

