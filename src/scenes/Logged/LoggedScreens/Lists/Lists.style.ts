import styled from "@emotion/styled";
import { colors } from "src/colors";


export const Carousel = styled.div`
  width: 100%;
  display: flex;
  gap: 15%;
  overflow-x: scroll;
  overflow-y: hidden;
  scroll-snap-type: x mandatory;
  ::-webkit-scrollbar {
    display: none;
  }
  -webkit-transition: opacity 0.2s linear;
  -ms-transition: opacity 0.2s linear;
  transition: opacity 0.2s linear;
`;

export const CarouselEdge = styled.div`
  width: 20px;
  height: 100%;
  flex-shrink: 0;
  @media(max-height: 750px){
      width: 32px;
  }
`;

export const Icon = styled.div`
  flex-shrink: 0;
  width: 10px;
  height: 100%;
  display: flex;
  overflow: hidden;
  align-items: center;
  justify-content: center;
  @media(max-height: 750px){
    width: 35px;
    height: 35px;
  }
`;

export const ItemInput = styled.input`
  position: absolute;
  width: 83%;
  padding: 10px 10px 10px 0;
  background: none;
  top: 11%;
  left: 8.5%;
  border: none;
  outline: none;
  border-bottom: 1px solid ${colors.grey};
  font-size: 16px;
  -webkit-transition: opacity 0.2s linear;
  -ms-transition: opacity 0.2s linear;
  transition: opacity 0.2s linear;
  @media(max-height: 750px){
    top: 75px;
    font-size: 15px;
  }
`;

export const PlaceholderContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 60px;
  gap: 20px;
  @media(max-height: 750px){
    margin-top: 50px;
    gap: 18px;
  }
`;

export const PlaceholderImage = styled.img`
  width: 200px;
  object-fit: scale-down;
  flex: 0;
  opacity: 0.5;
  @media(max-height: 750px){
    width: 180px;
  }
`;

export const PlaceholderText = styled.p`
  font-size: 15px;
  line-height: 17px;
  font-weight: 400;
  text-align: center;
  color: ${colors.lightGrey};
  @media(max-height: 750px){
    font-size: 14px;
  }
`;

