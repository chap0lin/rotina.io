import { languageOption } from "src/types";

type textTypes = {
  user: string;
  email: string;
  password: string;
  repeatPassword: string;
  forgotMyPassword: string;
  enterEmail: string;
  signUpHint: string;
  invalidEmail: string;
  newPasswordHint: string;
  passwordsDontMatch: string;
  haventSignedUpYet: string;
  buttonSignUp: string;
  buttonSignIn: string;
  buttonSend: string;
  goodToGo: string;
  noAccount: string;
  nameAlreadyExists: string;
  emailAlreadyExists: string;
  emailNotRegistered: string;
  willSendSignUpEmail: string;
  willSendRecoverEmail: string;
  somethingWentWrong: string;
  goBack: string;
};

const texts = new Map<languageOption, textTypes>();

texts.set("pt-br", {
  user: "Usuário",
  email: "E-mail",
  password: "Senha",
  repeatPassword: "Repetir senha",
  forgotMyPassword: "esqueci minha senha :(",
  enterEmail: "entre com o seu e-mail registrado.",
  signUpHint:
    "insira os seus dados nos campos acima para criar uma nova conta.",
  invalidEmail: "formato de e-mail inválido.",
  newPasswordHint:
    "a senha deve conter pelo menos 8 caracteres, sendo um deles especial.",
  passwordsDontMatch: "as senhas não coincidem.",
  haventSignedUpYet: "ainda não tem conta?",
  buttonSignUp: "cadastrar",
  buttonSignIn: "entrar",
  buttonSend: "enviar",
  goodToGo: "tudo certo!",
  noAccount: "Nenhuma conta encontrada. Você digitou tudo certinho?",
  nameAlreadyExists: "Nome já em uso. Por favor insira outro.",
  emailAlreadyExists: "E-mail já em uso. Por favor insira outro.",
  emailNotRegistered: "Não há nenhuma conta associada a este e-mail.",
  willSendSignUpEmail:
    "Quase lá! Acabamos de mandar um link de ativação para o e-mail informado. Acesse e clique para finalizar seu registro!",
  willSendRecoverEmail:
    "Legal! Enviamos um link para o e-mail fornecido. Abra-o e siga as instruções.",
  somethingWentWrong: "Alguma coisa deu errado. Tente novamente mais tarde.",
  goBack: "voltar p/ início",
});

texts.set("en-us", {
  user: "User",
  email: "E-mail",
  password: "Password",
  repeatPassword: "Repeat password",
  forgotMyPassword: "I forgot my password :(",
  enterEmail: "enter your registered account e-mail.",
  signUpHint:
    "insert your information in the fields above to create a new account.",
  invalidEmail: "invalid e-mail format.",
  newPasswordHint:
    "password must contain at least 8 characters, with one being special.",
  passwordsDontMatch: `the passwords don't match.`,
  haventSignedUpYet: "not registered yet?",
  buttonSignUp: "sign up",
  buttonSignIn: "sign in",
  buttonSend: "send",
  goodToGo: "all good!",
  noAccount: "We didn't find any account. Have you typed all correctly?",
  nameAlreadyExists: "Username already in use. Please insert a new one.",
  emailAlreadyExists: "E-mail already in use. Please insert a new one.",
  emailNotRegistered: "There's no account associated with this e-mail.",
  willSendSignUpEmail: `Almost there! We"ve just sent an activation link to the given e-mail address. Access and click to complete your registration!`,
  willSendRecoverEmail: `Great! We've just sent a recovery link to the given e-mail.`,
  somethingWentWrong: "Something went wrong. Please try again later.",
  goBack: "back to start",
});

export { texts };
