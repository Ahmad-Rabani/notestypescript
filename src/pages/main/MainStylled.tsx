import styled,{ css } from "styled-components";
{<style>
@import url(`https://fonts.googleapis.com/css2?family=Barlow:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap`);
</style>}

interface ButtonProps {
  $primary?: string;
  $secondry?: string;
  $outline?: string;
  $isclicked: boolean;
  onClick: () => void;
}

const flex = css`
display: flex;
align-items: center;
`;

export const HeadDiv = styled.div`
  ${flex};
  justify-content: space-between;
  margin-top: 40px;
  position: relative;
  overflow: hidden;
`;

export const Notes = styled.h2`
  display: flex;
  margin: 0;
  margin-left: 12px;
  font-family: "Barlow", sans-serif;
  color: black;
`;

export const AllAndStared = styled.div`
  ${flex};
`;

export const Button = styled.button<ButtonProps>`
height: 40px;
border-radius: 3px;
font-family: "Barlow", sans-serif;
border: ${(props) => props.$outline ? "none" : "1px solid #ccc"};
cursor: pointer;
width: ${(props) => props.$secondry ? "110px" : "70px"};
background-color: ${(props) => props.$isclicked ? "black" : "white"};
color: ${(props) => props.$isclicked ? "white" : "black"};

margin-left: ${(props) => props.$outline ? "20px" : "5px"};
margin-right: ${(props) => props.$outline ? "13px" : "0px"};

&:hover {
  transition: easein-out 0.5s;
  color: ${(props) => props.$outline? "red" : "none"};
  text-decoration: ${(props) => props.$outline ? "underline" : "none"};
  border: ${(props) => props.$outline ? "2px solid red" : "2px solid #ccc"};
`;

export const AddNotes = styled.div`
  ${flex};
  position: fixed;
  right: 10px;
  bottom: 10px;

  h2{
    font-family: "Barlow", sans-serif;
  }

  span {
    cursor: pointer;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background-color: black;
    position: relative;
    margin-left: 4px;
    font-family: "Barlow", sans-serif;

    h1 {
      width: 30px;
      height: 30px;
      margin: 0;
      color: white;
      position: absolute;
      bottom: 4px;
      left: 7px;
    }
  }
`;

export const CardsDiv = styled.div`
  display: grid !important;
  grid-template-columns: repeat(auto-fit, minmax(310px, 1fr));
  gap: 10px;
  min-height: 60vh;
  justify-items: center;
  justify-content: center;
  margin: 0 10px;
`;