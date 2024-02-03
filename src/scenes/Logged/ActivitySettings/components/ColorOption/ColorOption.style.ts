import styled from "@emotion/styled";

export const Box = styled.div`
  width: 30px;
  height: 30px;
  display: flex;
  border-radius: 5px;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  @media (max-height: 740px) {
    width: 27px;
    height: 27px;
  }
`;

export const Icon = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
