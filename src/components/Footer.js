import React, { useState } from "react";
import styled from "styled-components";
import { useEffect } from "react";

const StyledFooter = styled.footer`
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #202020;
`;

const Text = styled.a`
  cursor: pointer;
  color: #ffffff;
  text-align: center;
  text-decoration: none;
  transition: 0.3s;

  &:hover {
    color: #e62429;
    transition: 0.3s;
  }
`;
const Footer = () => {
  const [footerInfo, setFooterInfo] = useState();

  useEffect(() => {
    const getFooterInfo = async () => {
      const response = await fetch(
        `https://gateway.marvel.com/v1/public/characters?apikey=0e10884938787c40366929ce9fde20f4`
      );
      const data = await response.json();
      setFooterInfo(data);
    };
    getFooterInfo();
  }, []);

  const getHREFInfo = () => {
    const link = footerInfo.attributionHTML.split('"');

    return `${link[1]}`;
  };

  return (
    <>
      {footerInfo && (
        <StyledFooter>
          <Text href={getHREFInfo()}>{footerInfo.attributionText}</Text>
        </StyledFooter>
      )}
    </>
  );
};

export default Footer;
