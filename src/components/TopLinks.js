import React from "react";
import styled from "styled-components";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useHistory } from "react-router-dom";

const Container = styled.div`
  background-color: #151515;
  box-sizing: border-box;
  width: 100vw;
  height: 40px;
  padding: 0 100px;
`;

const Button = styled.button`
  cursor: pointer;
  background-color: transparent;
  color: #ffffff;
  border: none;
  outline: none;
  text-transform: uppercase;
  width: 200px;
  font-weight: bold;
  font-size: 11px;
  line-height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 0.3s;

  &:hover {
    background-color: #464646;
    transition: 0.3s;
  }
  &:active {
    background-color: #5b5b5b;
    transition: 0.3s;
  }
`;

const StyledIoMdArrowRoundBack = styled(IoMdArrowRoundBack)`
  color: #e62429;
  font-size: 16px;
  font-weight: bold;
  padding-right: 10px;
`;

const TopLinks = ({ buttonText }) => {
  const history = useHistory();

  const handleGoingBackButton = () => {
    history.goBack();
  };

  return (
    <Container>
      <Button onClick={handleGoingBackButton}>
        <StyledIoMdArrowRoundBack /> {buttonText}
      </Button>
    </Container>
  );
};

export default TopLinks;
