import styled,{css} from "styled-components";

interface secondryButton{
  $secondry: string;
}

const DivProperties = css`
 display: flex;
  justify-content: center;
  align-items: center;
`;

export const MainDiv = styled.div`
${DivProperties};
  width: 100%;
  height: 95vh;
`;

export const Form = styled.form`
  ${DivProperties};
  flex-direction: column;
  width: 400px;
  height: 400px;
  border: none;
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  margin: 0;
  gap: 30px;

  div {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;

    label {
      margin: 0;
      padding: 0 0 1px 42px;
      font-size: 14px;
      font-weight: 700;
      color: black;
      background-clip: text;
      align-self: start;
    }
  }

  h1 {
    margin: 0;
  }

  input {
    padding: 15px;
    border: 1px solid #ccc;
    border-radius: 5px;
    width: 80% !important;
    box-sizing: border-box;
    font-family: sans;
    font-size: 13px;
  }

`;

export const Button = styled.button<secondryButton>`
  cursor: pointer;
  background-color: blue;
  border-radius: 3px;
  border: none;

  width: ${(props) => props.$secondry ? "60px" : "100px"};
  height: ${(props) => props.$secondry ? "30px" : "50px"};
  color: ${(props) => props.$secondry ? "black" : "white"};
  background-color: ${(props) => props.$secondry ? "white" : "blue"};
  text-decoration: ${(props) => props.$secondry ? "underline" : "none"};
`