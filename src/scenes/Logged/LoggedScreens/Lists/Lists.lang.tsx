import { languageOption } from "src/types";

type textTypes = {
  shoppingListTitle: string | JSX.Element;
  todoListTitle: string | JSX.Element;
  todo: string;
  shopping: string;
  placeholder: string;
  nothingHere: string;
  listCleared: string;
  listDeleted: string;
  listCreated: string;
};

const texts = new Map<languageOption, textTypes>();

texts.set("pt-br", {
    shoppingListTitle: <>Lista de&nbsp;<span style={{fontWeight: "bold"}}>Compras</span></>,
    todoListTitle: <>Lista de&nbsp;<span style={{fontWeight: "bold"}}>Afazeres</span></>,
    todo: "afazeres",
    shopping: "compras",
    placeholder: "Insira um item...",
    nothingHere: "Nada por aqui!",
    listCleared: "Lista limpa!",
    listDeleted: "Lista apagada!",
    listCreated: "Lista criada com sucesso!"
});

texts.set("en-us", {
    shoppingListTitle: <><span style={{fontWeight: "bold"}}>Shopping</span>&nbsp;list</>,
    todoListTitle: <><span style={{fontWeight: "bold"}}>To-do</span>&nbsp;list</>,
    todo: "to-do",
    shopping: "shopping",
    placeholder: "Insert an item...",
    nothingHere: "Nothing in here!",
    listCleared: "List cleared!",
    listDeleted: "List deleted!",
    listCreated: "List created successfuly!"
});

export { texts };
