import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import styled from "styled-components";
import TopLinks from "../components/TopLinks";

const Container = styled.article`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  height: 100%;
  margin-bottom: -22px;
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 0 50px;
  width: 50%;
  color: #202020;
  background-color: #c0c0c0;
  border-left: 4px solid #e62429;
  min-height: calc(100vh - 150px);
`;


const DetailsContainer = styled.div``;

const Image = styled.img`
  width: 100%;
  transition: 0.3s;
`;

const ImageContainer = styled.div`
  width: 50%;
  display: flex;
  align-items: flex-start;
  overflow: hidden;

  &:hover img {
    transform: scale(1.1);
    transition: 0.3s;
  }
`;
const Name = styled.h1`
  text-transform: uppercase;
  font-weight: bold;
  padding-top: 30px;
  font-size: 30px;
`;

const Description = styled.p`
  line-height: 27px;
  text-align: justify;
  padding: 30px 0;
`;

const InfoTitle = styled.h2`
  text-transform: uppercase;
  font-weight: bold;
  font-size: 18px;
  padding-top: 15px;
`;

const List = styled.ul`
  list-style: none;
  padding: 15px 0;
`;
const ListItem = styled.li`
  font-weight: 500;
  cursor: pointer;
  line-height: 25px;
  padding: 3px 10px;
`;

const CharacterPage = () => {
  const [character, setCharacter] = useState();
  const { id } = useParams();

  useEffect(() => {
    const getCharacter = async () => {
      const response = await fetch(
        `https://gateway.marvel.com/v1/public/characters/${id}?apikey=0e10884938787c40366929ce9fde20f4`
      );
      const data = await response.json();
      setCharacter(data.data.results[0]);
    };
    getCharacter();
  }, [id]);

  return (
    <>
      <TopLinks buttonText="Back to Characters" />
      {character && (
        <Container id={id}>
          <ImageContainer>
            <Image
              src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
            />
          </ImageContainer>
            <InfoContainer>
              <Name>{character.name}</Name>

              {character.description && (
                <Description>{character.description}</Description>
              )}

              {character.comics.items.length > 0 && (
                <>
                  <DetailsContainer>
                    <InfoTitle>Comics</InfoTitle>
                    <List>
                      {character.comics.items.map((comic, index) => (
                        <ListItem key={index} url={comic.resourseURI}>
                          {comic.name}
                        </ListItem>
                      ))}
                    </List>
                  </DetailsContainer>
                </>
              )}

              {character.series.items.length > 0 && (
                <>
                  <DetailsContainer>
                    <InfoTitle>Series</InfoTitle>
                    <List>
                      {character.series.items.map((series, index) => (
                        <ListItem style={{ cursor: "default" }} key={index}>
                          {series.name}
                        </ListItem>
                      ))}
                    </List>
                  </DetailsContainer>
                </>
              )}

              {character.stories.items.length > 0 && (
                <>
                  <DetailsContainer>
                    <InfoTitle>Stories</InfoTitle>
                    <List>
                      {character.stories.items.map((stories, index) => (
                        <ListItem style={{ cursor: "default" }} key={index}>
                          {stories.name}
                        </ListItem>
                      ))}
                    </List>
                  </DetailsContainer>
                </>
              )}
            </InfoContainer>
        </Container>
      )}
      ;
    </>
  );
};

export default CharacterPage;
