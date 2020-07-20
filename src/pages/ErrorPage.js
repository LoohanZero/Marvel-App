import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #c0c0c0;
  height: calc(100vh - 110px);
`;
const Image = styled.img`
  height: 200px;
  border-radius: 10px;
  box-shadow: 0 26px 24px -16px rgba(0, 0, 0, 0.4);
`;
const Info = styled.h1`
  padding: 30px;
  color: #202020;
  text-transform: uppercase;
  
`;

const ErrorPage = ({text}) => {
  return (
    <Container>
      <Image src="500-internal-server-error-featured-image-1.png" />
      <Info>{text}</Info>
    </Container>
  );
};

export default ErrorPage;
