import { languageOption } from "../../types";

type textTypes = {
    loading: string;
}

const texts = new Map<languageOption, textTypes>();

texts.set('pt-br', {
    loading: "Um momento... Segura aí!",
})

texts.set('en-us', {
    loading: "Loading... Hang on!",
})

export { texts };

