import React from "react";
import styled from "styled-components";
import {useHistory} from "react-router-dom"

const Container = styled.article`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  margin: 25px;
  width: 225px;
  height: 500px;

  &:hover .card-hover {
    transform: translateY(-15px);
    transition: 0.3s;
  } 

  &:hover h1 {
      color: #e62429;
      transition: 0.3s;
  }
`;

const Image = styled.img`
  width: 225px;
`;
const ImageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 340px;
  width: 225px;
  overflow: hidden;
  background-color: #202020;
  box-shadow: 0 26px 24px -16px rgba(0, 0, 0, 0.4);
  margin-bottom: 30px;
  transition: 0.3s;
`;

const InfoContainer = styled.div``;

const Title = styled.h1`
  width: 225px;
  font-size: 14px;
  text-align: justify;
  line-height: 16px;
  padding-bottom: 4px;
  transition: 0.3s;
`;

const Creator = styled.p`
  font-size: 12px;
  
`;

const ComicsCard = ({ comic }) => {
  const { id, thumbnail, title, creators } = comic;
  const history = useHistory()

  const onComicClick = (id) => {
    history.push(`comics/${id}`)
  }

  return (
    <Container onClick={() => onComicClick(id)} id={id}>
      <ImageContainer className="card-hover">
        <Image src={`${thumbnail.path}.${thumbnail.extension}`} />
      </ImageContainer>
      <InfoContainer>
        <Title>{title}</Title>
        {creators.items[0] && <Creator>{creators.items[0].name}</Creator>}
        {creators.items[1] && <Creator>{creators.items[1].name}</Creator>}
      </InfoContainer>
    </Container>
  );
};

export default ComicsCard;
