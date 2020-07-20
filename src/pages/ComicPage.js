import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import styled from "styled-components";
import TopLinks from "../components/TopLinks";

const MainContainer = styled.div``;

const BackgroundImage = styled.div`
  position: absolute;
  height: 80%;
  width: 100%;
  opacity: 0.2;
  background-image: url(${(props) => props.backgroundImg});
  filter: blur(20px);
  z-index: 1;
`;

const Container = styled.article`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  height: 100%;
  background-color: #000000;
  padding: 40px 0 15px 0;
  box-sizing: border-box;
`;


const DetailsContainer = styled.div`
  padding: 0 0 5px 50px;
  width: 50%;
  min-height: calc(100vh - 215px);
`;

const Image = styled.img`
  height: 500px;
`;

const Title = styled.h1`
  color: #ffffff;
  margin-bottom: 20px;
`;

const Description = styled.p`
  color: #ffffff;
  line-height: 20px;
  width: 600px;
  text-align: justify;
  padding-bottom: 15px;
`;

const Subtitle = styled.h2`
  color: #ffffff;
  font-size: 17px;
  padding: 30px 0 10px 0;
`;

const GenericText = styled.p`
  color: #ffffff;
  font-size: 15px;
  line-height: 20px;
  width: 600px;
  text-align: justify;
`;

const ComicPage = () => {
  const [comic, setComic] = useState();
  const [publishedDate, setPublishedDate] = useState();
  const [description, setDescription] = useState();
  const { id } = useParams();

  useEffect(() => {
    const getComic = async () => {
      const response = await fetch(
        `https://gateway.marvel.com/v1/public/comics/${id}?apikey=0e10884938787c40366929ce9fde20f4`
      );
      const data = await response.json();
      setComic(data.data.results[0]);
      setPublishedDate(data.data.results[0].dates[0].date);
      setDescription(data.data.results[0].description);

    };
    getComic();
  }, [id]);

  const PublishedDate = () => {
    const date = publishedDate.slice(0, 10).split("-");
    const event = new Date(Date.UTC(date[0], date[1] - 1, date[2], 3, 0, 0));

    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };

    return event.toLocaleDateString("en-EN", options);
  };

  const CleanDescription = () => {
    const slicedDescription = description.split("<br>");

    return (
      <>
        {slicedDescription.map((paragraph, index) => (
          <Description key={index}>{paragraph}</Description>
        ))}
      </>
    );
  };

  const publishedInfo = publishedDate && PublishedDate();
  const publishedDescription = description && CleanDescription();

  return (
    <>
      <TopLinks buttonText="Back to Comics" />
      {comic && publishedInfo && (
        <>
          <MainContainer id={id}>
            <Container>
              <BackgroundImage
                backgroundImg={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
              />
              <Image
                src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
              />
              <DetailsContainer>
                <Title>{comic.title}</Title>
                {publishedDescription}

                <Subtitle>Published</Subtitle>
                <GenericText>{publishedInfo}</GenericText>

                {comic.creators.available > 0 && (
                  <>
                    <Subtitle>Creators</Subtitle>
                    {comic.creators.available > 0 &&
                      comic.creators.items.map((creator, index) => (
                        <GenericText key={index}>{creator.name}</GenericText>
                      ))}
                  </>
                )}

                {comic.characters.available > 0 && (
                  <>
                    <Subtitle>Characters</Subtitle>
                    {comic.characters.available > 0 &&
                      comic.characters.items.map((creator, index) => (
                        <GenericText key={index}>{creator.name}</GenericText>
                      ))}
                  </>
                )}
              </DetailsContainer>
            </Container>
          </MainContainer>
        </>
      )}
    </>
  );
};

export default ComicPage;
