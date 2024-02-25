import ReactDOM from "react-dom/client";
import Router from "./routes";
import GlobalProvider from "./contexts/GlobalContextProvider";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(               
  <GlobalProvider>
    <Router />
  </GlobalProvider>
);

// strict mode está causando problemas por causa da execução dupla de useEffects sem árvores de dependências.
// Optei por removê-lo, mas não sei se isso tornará a aplicação mais difícil de debugar (afinal, 
// o motivo original dele existir é exatamente o de ajudar a caçar bugs: https://react.dev/reference/react/StrictMode).
