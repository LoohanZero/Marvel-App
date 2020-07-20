import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { RingLoader } from "react-spinners";
import styled from "styled-components";
import Card from "../components/CharactersCard";
import PageSelector from "../components/PageSelector";
import ErrorPage from "./ErrorPage"

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  background-color: #c0c0c0;
  padding-bottom: 25px;
`;

const LoadingErrorContainer = styled(Container)`
  display: flex;
  flex-wrap: none;
  justify-content: center;
  align-items: center;
  background-color: #c0c0c0;
  height: calc(100vh - 120px);
`;

const CharactersPage = () => {
  const [characters, setCharacters] = useState([]);
  const [totalCount, setTotalCount] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState()
  const { search } = useLocation();

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);

    const getCharacters = async () => {
      try {
        const response = await fetch(
          `https://gateway.marvel.com/v1/public/characters${
            search ? search : "?apikey=0e10884938787c40366929ce9fde20f4"
          }&limit=18`
        );
        const data = await response.json();
        setCharacters(data.data.results);
        setTotalCount(data.data.total);
        search && setCurrentPage(Math.ceil((data.data.offset / data.data.limit) + 1));
        setIsLoading(false);
      } catch (error) {
        const errorInfo = new Error(error)
        setError(errorInfo.message)
        setIsError(true);
        setIsLoading(false);
      }
    };
    getCharacters();
  }, [search]);

  console.log(error)

  return (
    <>
      {isLoading && (
        <LoadingErrorContainer>
          <RingLoader css="override" size="100" />
        </LoadingErrorContainer>
      )}
      <Container>
        {!isLoading && !isError && (
          <PageSelector
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            limit={18}
            totalCount={totalCount}
          />
        )}
        {!isLoading &&
          !isError &&
          characters.map((character) => (
            <Card key={character.id} character={character} />
          ))}
      </Container>
      {isError && (
        <LoadingErrorContainer>
          <ErrorPage text={error} />
        </LoadingErrorContainer>
      )}
    </>
  );
};

export default CharactersPage;
