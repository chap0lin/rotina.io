import styled from "@emotion/styled";
import { colors } from "src/colors";

const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const Icon = styled.div`
  width: 36px;
  height: 36px;
  padding: 7px;
  border: 1.8px solid ${colors.black};
  border-radius: 20px;
  cursor: pointer;
  @media(max-height: 750px){
    width: 32px;
    height: 32px;
    padding: 5px;
  }
`;

export const NoteSpace = styled(FlexColumn)`
  padding: 20px;
  gap: 10px;
  @media(max-height: 750px){
    padding: 15px;
  }
`;

export const NoteHeader = styled(FlexColumn)`
  gap: 2px;
  margin-bottom: 5px;
`;

export const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  position: relative;
`;

export const Texts = styled.div`
  display: flex;
  align-items: center;
  max-width: 80%;
  gap: 10px;
`;

export const Title = styled.p`
  font-size: 22px;
  font-family: Motley;
  text-transform: uppercase;
  margin: 0;
  color: ${colors.black};
`;

export const ActivityName = styled.p`
  border-radius: 5px;
  flex-grow: 0;
  font-size: 15px;
  padding: 2px 5px;
  color: ${colors.white};
  margin-right: auto;
  max-width: 50%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  word-break: break-all;
`;

export const NoteInput = styled.input`
  width: 100%;
  font-size: 16px;
  border: none;
  background: white;
  color: black;
  border: 1px solid #aaaaaa;
  border-radius: 10px;
  padding: 10px;
  margin-top: 10px;
  :focus {
    outline: none;
  }
  @media (max-height: 750px) {
    font-size: 15px;
  }
`;

export const NoteList = styled.ul`
  font-size: 16px;
  width: 100%;
  margin: 0;
  padding: 0;
  max-height: 500px;
  overflow: scroll;
  @media (max-height: 750px) {
    max-height: 350px;
  }
`;

export const Note = styled.li`
  width: 100%;
  text-justify: none;
  font-size: 16px;
  color: black;
  background: white;
  display: flex;
  @media (max-height: 750px) {
    font-size: 15px;
  }
`;
