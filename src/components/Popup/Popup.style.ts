import styled from '@emotion/styled';
import { colors } from 'src/colors';

const Container = styled.div`
  scale: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  overflow: hidden;
  position: fixed;
  z-index: 5;
  @media screen and (min-width: 500px) {
    scale: 0;
    width: 412px;
    display: flex;
    justify-content: center;
  }
`;

export const TopContainer = styled(Container)`
  top: -280px;
`;

export const BottomContainer = styled(Container)`
  bottom: -280px;
`;

export const PopupContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px 20px 0 20px;
  width: 360px;
  border-radius: 15px;
  background: ${colors.white};
  opacity: 0.95;
  @media (max-height: 750px) {
    padding: 15px 15px 0 15px;
    width: 330px;
  }
`;

export const Cookie = styled.img`
  width: 40px;
  object-fit: scale-down;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Title = styled.p`
  color: ${colors.black};
  margin: 0;
  font-size: 24px;
  font-family: Motley;
`;

export const Description = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  max-height: 600px;
  color: ${colors.black};
  font-size: 17px;
  overflow-y: scroll;
  margin: 20px 0;
  ::-webkit-scrollbar {
    display: none;
  }
  @media (max-height: 750px) {
    max-height: 450px;
    font-size: 16px;
  }
`;

export const WarningDescription = styled(Description)`
  flex-direction: row;
  gap: 20px;
`;
