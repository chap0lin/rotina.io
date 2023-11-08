import { languageOption } from "src/types";

type textTypes = {
    createActivity: string[],
}

const texts = new Map<languageOption, textTypes>();

texts.set('pt-br', {
    createActivity: ["Quer criar uma nova atividade?", "Basta apertar o botão abaixo."],
})

texts.set('en-us', {
    createActivity: ["Wanna create a new activity?", "Just press the button below."],
})

export { texts };

