import styled from "@emotion/styled";
import { colors } from "src/colors";

const Gsap = styled.div`
    position: absolute;
    bottom: 0;
    -webkit-transition: opacity 0.2s linear;
    -ms-transition: opacity 0.2s linear;
    transition: opacity 0.2s linear;
`;

export const Container = styled.div`
    position: absolute;
    bottom: 30px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const Left = styled(Gsap)`
    left: 7.5%;
`;

export const Center = styled(Gsap)`
`;

export const Right = styled(Gsap)`
    right: 7.5%;
`;

export const Text = styled.p`
    font-size: 16px;
    font-weight: 500;
    color: ${colors.black};
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const InputAndButton = styled.div`
    display: flex;
    align-items: center;
    gap: 5px;
`;

export const Input = styled.input`
    flex: 1;
    background: none;
    outline: none;
    border: none;
    border-radius: 10px;
    text-align: right;
    font-size: 16px;
`;

export const ColorOptions = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
`;

export const Option = styled.button`
    width: 25px;
    height: 25px;
    outline: none;
    border: none;
    background: none;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const Lists = styled(Right)`
    right: calc(7.5% - 310px);
    opacity: 0;
    bottom: 60px;    
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: flex-end;
    gap: 10px;
    border-radius: 10px;
    padding: 10px;
    @media(max-height: 750px){
        bottom: 55px;
    }
`;

export const ListName = styled.p`
    font-size: 18px;
    padding: 7px 15px;
    border-width: 1px solid ${colors.black};
    border-radius: 5px;
    color: ${colors.white};
    width: 100%;
    max-width: 220px;
    cursor: pointer;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    -webkit-transition: all 0.1s linear;
    -ms-transition: all 0.1s linear;
    transition: all 0.1s linear;
    @media(max-height: 750px){
        padding: 4px 13px;
        font-size: 16px;
    }
`;

export const NewListSection = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    color: ${colors.black};
    padding-left: 10px;
`;

export const Icon = styled.div`
    padding: 5px;
    width: 55px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    @media(max-height: 750px){
        width: 50px;
    }
`;