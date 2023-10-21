import { LanguageOption } from "../../types";

type textTypes = {
    user: string;
    email: string;
    password: string;
    repeatPassword: string;
    forgotMyPassword: string;
    willSendEmail: string;
    signUpHint: string;
    invalidEmail: string;
    newPasswordHint: string;
    passwordsDontMatch: string;
    haventSignedUpYet: string;
    buttonSignUp: string;
    buttonSignIn: string;
    buttonSend: string;
    goodToGo: string;
}

const texts = new Map<LanguageOption, textTypes>();

texts.set('pt-br', {
    user: 'Usuário',
    email: 'E-mail',
    password: 'Senha',
    repeatPassword: 'Repetir senha',
    forgotMyPassword: 'esqueci minha senha :(',
    willSendEmail: 'Entre com o seu e-mail registrado.',
    signUpHint: 'insira os seus dados nos campos acima para criar uma nova conta.',
    invalidEmail: 'formato de e-mail inválido.',
    newPasswordHint: 'a senha deve conter pelo menos 8 caracteres, sendo um deles especial.',
    passwordsDontMatch: 'as senhas não coincidem.',
    haventSignedUpYet: 'ainda não tem conta?',
    buttonSignUp: 'cadastrar',
    buttonSignIn: 'entrar',
    buttonSend: 'enviar',
    goodToGo: 'tudo certo!',
})

texts.set('en-us', {
    user: 'User',
    email: 'E-mail',
    password: 'Password',
    repeatPassword: 'Repeat password',
    forgotMyPassword: 'I forgot my password :(',
    willSendEmail: `Enter your registered account e-mail.`,
    signUpHint: 'insert your information in the fields above to create a new account.',
    invalidEmail: 'invalid e-mail format.',
    newPasswordHint: 'password must contain at least 8 characters, with one being special.',
    passwordsDontMatch: `the passwords don't match.`,
    haventSignedUpYet: 'not registered yet?',
    buttonSignUp: 'sign up',
    buttonSignIn: 'sign in',
    buttonSend: 'send',
    goodToGo: 'all good!',
})

export { texts };

