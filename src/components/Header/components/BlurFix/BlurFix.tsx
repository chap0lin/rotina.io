import { useLayoutEffect, useRef } from "react";
import { Blurry } from "./BlurFix.style";
import { spawn, vanish } from "src/functions/animation";

interface props {
  show: boolean;
  onClick: () => void;
}

const TRANSITION_PERIOD = 0.25;

export default function BlurFix({ show, onClick }: props) {
  const blurRef = useRef(null);

  useLayoutEffect(() => {
    show
      ? spawn(blurRef.current, TRANSITION_PERIOD)
      : vanish(blurRef.current, TRANSITION_PERIOD);
  }, [show]);

  return <Blurry ref={blurRef} onClick={onClick} />;
}

/* TODO
    Este componente surgiu como uma gambiarra para resolver o problema de os ícones do <Header />
    não estarem ficando borrados quando o <Blur /> é exibido. A minha estratégia inicial foi definir
    o z-index do <Blur /> como 90 e o dos ícones como 0 ou 100 a depender de se tinham sido selecionados
    (desta forma ficando atrás ou à frente do borrado), mas não funcionou como esperado. Assim sendo,
    modifiquei a estilização do <Header /> e criei este elemento <BlurFix /> para ficar sobreposto por
    cima dos ícones quando eles tiverem que ficar borrados. Gambiarra, mas pelo menos funciona.

    Uma vez que não for mais necessário fazer isso porque o <Blur /> já vai estar funcionando como
    deveria, remover esse componente.
*/
