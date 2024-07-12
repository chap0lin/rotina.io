import { Container } from "./Background.style";

interface props {
  children: any;
}

export default function Background({ children }: props) {
  return <Container>{children}</Container>;
}
