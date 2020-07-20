import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

const HoverContainer = styled.div`
  background-color: #e62429;
  height: 50%;
  width: 190px;
  position: absolute;
  z-index: 1;
  transition: 0.4s;
`;

const Container = styled.article`
  width: 190px;
  height: 350px;
  display: flex;
  flex-direction: column;
  background-color: #202020;
  margin: 15px;
  position: relative;
  transition: 0.3s;
  cursor: pointer;

  &::after {
    content: "";
    border-bottom-color: transparent;
    border-left-color: transparent;
    border-right-color: #c0c0c0;
    border-style: solid;
    border-top-color: transparent;
    border-width: 12px 12px 0 0;
    bottom: 0;
    position: absolute;
    right: 0;
    top: auto;
    z-index: 40;
  }

  &:hover > .hover-box {
    transform: translateY(99.6%);
    transition: 0.4s;
  }

  &:hover img {
    transform: scale(1.1);
    transition: 0.4s;
  }
`;
const ImageContainer = styled.div`
  height: 50%;
  padding: 0;
  z-index: 9;
  border-bottom: 4px solid #e62429;
  overflow: hidden;
`;
const Image = styled.img`
  height: 100%;
  width: 100%;
  padding: 0;
  z-index: 10;
  transition: 0.4s;
`;

const Name = styled.h1`
  font-size: 18px;
  text-transform: uppercase;
  font-weight: bold;
  color: white;
  padding: 15px;
  z-index: 15;
`;

const Card = ({ character }) => {
  const { id, name, thumbnail } = character;
  const history = useHistory();

  const handleCharacterClick = (id) => {
    history.push(`characters/${id}`);
  };

  return (
    <Container onClick={() => handleCharacterClick(id)} id={id}>
      <HoverContainer className="hover-box" />
      <ImageContainer>
        <Image src={`${thumbnail.path}.${thumbnail.extension}`} />
      </ImageContainer>
      <Name>{name}</Name>
    </Container>
  );
};

export default Card;
