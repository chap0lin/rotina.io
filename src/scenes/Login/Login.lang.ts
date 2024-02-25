import { languageOption } from "src/types";

type textTypes = {
  user: string;
  email: string;
  password: string;
  repeatPassword: string;
  code: string;
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
  invalidCode: string;
  verify: string;
};

const texts = new Map<languageOption, textTypes>();

texts.set("pt-br", {
  user: "Usuário",
  email: "E-mail",
  password: "Senha",
  repeatPassword: "Repetir senha",
  code: "Código",
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
    "Quase lá! Acabamos de mandar um código para o email informado. Insira-o para concluir seu registro!",
  willSendRecoverEmail:
    "Legal! Enviamos um código para o email fornecido. Insira-o para concluir a recuperação da conta.",
  somethingWentWrong: "Alguma coisa deu errado. Tente novamente mais tarde.",
  invalidCode: "O código é inválido. Tente novamente.",
  verify: "verificar",
});

texts.set("en-us", {
  user: "User",
  email: "E-mail",
  password: "Password",
  repeatPassword: "Repeat password",
  code: "Code",
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
  willSendSignUpEmail: `Almost there! We've just sent a code to the given e-mail. Insert it above to conclude your registry!`,
  willSendRecoverEmail: `Great! We've just sent a recovery code to the given e-mail. Insert it above to complete the account recovery.`,
  somethingWentWrong: "Something went wrong. Please try again later.",
  invalidCode: "The code is invalid. Try again.",
  verify: "verify",
});

export { texts };
