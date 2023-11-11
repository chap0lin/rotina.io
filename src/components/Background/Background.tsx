import { Container } from "./Background.style";

interface props {
  children: JSX.Element | JSX.Element[];
}

export default function Background({ children }: props) {
  return <Container>{children}</Container>;
}
