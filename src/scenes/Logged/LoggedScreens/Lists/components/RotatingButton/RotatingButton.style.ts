import styled from "@emotion/styled";

export const Container = styled.button`
    border-radius: 10px;
    width: 55px;
    height: 55px;
    border: none;
    outline: none;
    overflow: hidden;
    font-size: 18px;
    padding: 0;
    margin: 0;
    cursor: pointer;
    transition: background 0.5s;
    @media(max-height: 750px){
        width: 50px;
        height: 50px;
        font-size: 16px;
    }
`;

export const Content = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`;