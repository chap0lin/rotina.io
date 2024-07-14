import { languageOption } from "src/types";

type textTypes = {
  share: string;
  howTo: string;
  text: string,
  textBrief: string,
  link: string,
  linkBrief: string,
  soon: string,
  copySuccess: string,
  copyError: string
};

const texts = new Map<languageOption, textTypes>();

texts.set("pt-br", {
  share: "Compartilhar",
  howTo: "Como você deseja compartilhar esta lista?",
  text: "Texto",
  textBrief: "copiar a lista em formato de texto simples. Portátil para outros apps",
  link: "Link",
  linkBrief: "um link de acesso temporário será dado, permitindo que outros editem em tempo real",
  soon: "(em breve)",
  copySuccess: "Lista copiada!",
  copyError: "Sentimos muito, mas algo deu errado. Tente novamente mais tarde."
});

texts.set("en-us", {
  share: "Share",
  howTo: "How would you like to share this list?",
  text: "Text",
  textBrief: "copy the list in simple text format. You can paste it anywhere",
  link: "Link",
  linkBrief: "a temporary link will be given, enabling others to edit in real time",
  soon: "(soon)",
  copySuccess: "Copied to clipboard!",
  copyError: "We're sorry, but something went wrong. Please try again later."
});

export { texts };
