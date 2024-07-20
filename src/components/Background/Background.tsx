import { Outer, Inner, OuterImg } from "./Background.style";

interface props {
  children: any;
}

export default function Background({ children }: props) {
  return (
    <Outer>
      <OuterImg/>
      <Inner>
        {children}
      </Inner>
    </Outer>
  );
}
