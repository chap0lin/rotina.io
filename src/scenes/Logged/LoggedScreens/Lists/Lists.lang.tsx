import { languageOption } from "src/types";

type textTypes = {
  shoppingListTitle: string | JSX.Element;
  todoListTitle: string | JSX.Element;
  todo: string;
  shopping: string;
  placeholder: string;
  nothingToDo: string;
  nothingToShop: string;
  juliusPhrase: string | JSX.Element;
};

const texts = new Map<languageOption, textTypes>();

texts.set("pt-br", {
    shoppingListTitle: <>Lista de&nbsp;<span style={{fontWeight: "bold"}}>Compras</span></>,
    todoListTitle: <>Lista de&nbsp;<span style={{fontWeight: "bold"}}>Afazeres</span></>,
    todo: "afazeres",
    shopping: "compras",
    placeholder: "Insira um item...",
    nothingToDo: "Nada pra fazer! yey!",
    nothingToShop: "Nada para comprar. ainda.",
    juliusPhrase: <>Se você não comprar,<br/>o desconto é maior.</>
});

texts.set("en-us", {
    shoppingListTitle: <><span style={{fontWeight: "bold"}}>Shopping</span>&nbsp;list</>,
    todoListTitle: <><span style={{fontWeight: "bold"}}>To-do</span>&nbsp;list</>,
    todo: "to-do",
    shopping: "shopping",
    placeholder: "Insert an item...",
    nothingToDo: "Nothing to do! yey!",
    nothingToShop: "Nothing to buy. yet.",
    juliusPhrase: <>if you don't buy,<br/>the discount is bigger.</>
});

export { texts };
