import styled from "@emotion/styled";
import { colors } from "src/colors";

export const Container = styled.div`
  flex-shrink: 0;
  display: flex;
  justify-content: center;
  scroll-snap-align: center;
  width: 85%;
  height: 100%;
`;

export const ListSection = styled.div`
  width: 100%;
  height: 100%;
`;

export const TitleSection = styled.div`
  margin-top: 5%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  cursor: pointer;
`;

export const Title = styled.p`
  text-align: left;
  border-radius: 10px;
  color: ${colors.white};
  font-size: 28px;
  line-height: 35px;
  padding: 10px 15px;
  font-weight: 400;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  transition: background 0.25s;
  @media (max-height: 750px) {
    font-size: 24px;
    line-height: 28px;
  }
`;

export const PlaceholderSection = styled.div`
  width: 100%;
  height: 70%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  @media(max-height: 750px){
    height: 80%;
  }
`;

export const PlaceholderImageSection = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 40px 0;
`;

export const PlaceholderImage = styled.img`
  width: 50%;
  max-width: 200px;
  object-fit: scale-down;
  opacity: 0.8;
`;

export const PlaceholderTitle = styled(Title)`
  color: ${colors.grey};
`;

export const PlaceholderText = styled.p`
  color: ${colors.grey};
  margin-top: 10px;
  font-size: 16px;
  font-weight: 400;
  text-align: justify;
  width: 100%;
  max-width: 300px;
  @media(max-height: 750px){
    font-size: 15px;
    max-width: 260px;
  }
`;