import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #151515;
  box-sizing: border-box;
  width: 100vw;
  height: 40px;
  margin-bottom: 25px;
`;

const Page = styled.a`
  cursor: pointer;
  background-color: transparent;
  text-decoration: none;
  color: #ffffff;
  border: none;
  outline: none;
  text-transform: uppercase;
  width: 100px;
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

const PageSelector = ({ currentPage, setCurrentPage, limit, totalCount }) => {
  const history = useHistory();
  const { pathname, search } = useLocation();
  const maxPage = Math.ceil(totalCount / limit);


  const previousPage = () => {
    const searchParams = new URLSearchParams(search);
    const offset = limit * currentPage - limit * 2;
    console.log(offset);
    searchParams.set("offset", offset);
    searchParams.set("limit", limit);
    searchParams.set("apikey", "0e10884938787c40366929ce9fde20f4");
    const newUrl = `${pathname}?${searchParams.toString()}`;

    setCurrentPage(currentPage - 1);
    history.push(newUrl);

    if (currentPage === 1) {
      toLastPage();
    }
  };

  const toFirstPage = () => {
    const searchParams = new URLSearchParams(search);
    const offset = 0;

    searchParams.set("offset", offset);
    searchParams.set("limit", limit);
    searchParams.set("apikey", "0e10884938787c40366929ce9fde20f4");
    const newUrl = `${pathname}?${searchParams.toString()}`;

    history.push(newUrl);
    setCurrentPage(1);
  };

  const toNextPage = () => {
    const searchParams = new URLSearchParams(search);
    const offset = limit * currentPage;

    searchParams.set("offset", offset);
    searchParams.set("limit", limit);
    searchParams.set("apikey", "0e10884938787c40366929ce9fde20f4");
    const newUrl = `${pathname}?${searchParams.toString()}`;

    setCurrentPage(currentPage + 1);
    history.push(newUrl);

    if (currentPage === maxPage) {
      toFirstPage();
    }
  };

  const toLastPage = () => {
    const searchParams = new URLSearchParams(search);
    const offset = totalCount - limit;
    console.log(totalCount);
    console.log(offset);
    console.log(maxPage);

    searchParams.set("offset", offset);
    searchParams.set("limit", limit);
    searchParams.set("apikey", "0e10884938787c40366929ce9fde20f4");
    const newUrl = `${pathname}?${searchParams.toString()}`;

    history.push(newUrl);
    setCurrentPage(maxPage);
  };

  return (
    <Container>
      <Page onClick={toFirstPage}>{"<<"}</Page>
      <Page onClick={previousPage}>{"<"}</Page>
      <Page>{currentPage}</Page>
      <Page onClick={toNextPage}>{">"}</Page>
      <Page onClick={toLastPage}>{">>"}</Page>
    </Container>
  );
};

export default PageSelector;
