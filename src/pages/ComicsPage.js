import React, { useEffect, useState } from "react";
import { RingLoader } from "react-spinners";
import styled from "styled-components";
import Card from "../components/ComicsCard";
import PageSelector from "../components/PageSelector";
import { useLocation } from "react-router-dom";
import ErrorPage from "./ErrorPage";

const Container = styled.div`
  width: 100vw;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  background-color: #c0c0c0;

`;
const LoadingErrorContainer = styled(Container)`
  display: flex;
  flex-wrap: none;
  justify-content: center;
  align-items: center;
  background-color: #c0c0c0;
  height: calc(100vh - 70px);
`;

const ComicsPage = () => {
  const [comics, setComics] = useState([]);
  const [totalCount, setTotalCount] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState();
  const { search } = useLocation();

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);

    const getComics = async () => {
      try {
        const response = await fetch(
          `https://gateway.marvel.com/v1/public/comics${
            search ? search : "?apikey=0e10884938787c40366929ce9fde20f4"
          }`
        );
        const data = await response.json();
        setComics(data.data.results);
        setTotalCount(data.data.total);
        search && setCurrentPage(Math.ceil((data.data.offset / data.data.limit) + 1));
        setIsLoading(false);
      } catch (error) {
        const errorInfo = new Error(error);
        setError(errorInfo.message);
        setIsError(true);
        setIsLoading(false);
      }
    };
    getComics();
  }, [search]);

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
            limit={20}
            totalCount={totalCount}
          />
        )}
        {!isLoading &&
          comics.map((comic) => <Card key={comic.id} comic={comic} />)}
      </Container>
      {isError && (
        <LoadingErrorContainer>
          <ErrorPage text={error} />
        </LoadingErrorContainer>
      )}
    </>
  );
};

export default ComicsPage;
