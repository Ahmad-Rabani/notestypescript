import styled, { css } from "styled-components";
{
  <style>
    @import
    url(`https://fonts.googleapis.com/css2?family=Barlow:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap`);
  </style>;
}

interface IsStaredButton {
  $stared: boolean;
}

const CardTextproperties = css`
  padding: 10px 0 0 15px;
  color: rgb(249, 237, 237);
  margin: 0;
  font-family: "Barlow", sans-serif;
`;

const CardIconsProperties = ({$stared = false}: IsStaredButton) => css`
  position: absolute;
  font-size: 18px;
  cursor: pointer;
  background-color: black;
  border-radius: 50%;
  padding: 4px;
  font-size: 25px;
  bottom: 10px;
  margin-right: 10px;
  margin-top: 10px;
  right: 2px;
  color: ${$stared ? "yellow" : "white"};

  &:hover {
    padding: 6px;
  }
`;

export const CloseIcon = styled.span`
  color: rgb(255, 255, 255);
  cursor: pointer;
  background-color: black;
  border-radius: 50%;
  font-size: 22px !important;
  transition: all ease-in-out;
  position: absolute;
  right: -10px;
  top: -10px;
  visibility: hidden;
`;

export const Cards = styled.div`
  width: 100%;
  height: 250px;
  border-radius: 7px;
  background-color: rgb(30 33 37);
  border: none;
  max-width: 400px;
  position: relative;

  &:hover ${CloseIcon} {
    visibility: visible;
  }
`;

export const CardName = styled.p`
  font-size: 16px;
  font-weight: 700;
  ${CardTextproperties};
`;

export const CardDescription = styled.p`
  font-size: 13px;
  height: 170px;
  ${CardTextproperties};
`;

export const CardDate = styled.p`
  font-size: 12px;
  ${CardTextproperties};
`;

export const EditIcon = styled.span`
  right: 40px;
  color: rgb(249, 237, 237);
  position: absolute;
  font-size: 18px;
  cursor: pointer;
  background-color: black;
  border-radius: 50%;
  padding: 4px;
  font-size: 25px;
  bottom: 10px;
  margin-right: 10px;
  margin-top: 10px;

  &:hover {
    padding: 6px;
  }
`;

export const StarIcon = styled.span<IsStaredButton>`
  ${CardIconsProperties};
`;

// StarIcon.defaultProps = {
//   $stared : false,
// }