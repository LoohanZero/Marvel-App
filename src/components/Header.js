import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

const StyledHeader = styled.header`
  width: 100%;
  height: 70px;
  display: flex;
  justify-content: center;
  background-color: #202020;
`;
const Nav = styled.nav`
  display: flex;
  justify-content: space-around;
  width: 100%;
`;

const StyledNavLink = styled(NavLink)`
  color: #ffffff;
  text-decoration: none;
  padding: 20px;
  text-transform: uppercase;
  font-weight: bold;
  width: 150px;
  text-align: center;
  transition: 0.3s;


  @media (max-width: 500px) {
    padding: 20px 0;
  }

  &:hover {
    background-color: #464646;
    transition: 0.3s;
  }
  &:active {
    background-color: #5b5b5b;
    transition: 0.3s;
  }

  &.selected {
    color: #e62429;
  }
`;

const Header = () => {
  return (
    <StyledHeader>
      <Nav>
        <StyledNavLink activeClassName="selected" to="/characters">
          Characters
        </StyledNavLink>
        <StyledNavLink activeStyle={{ color: "#e62429" }} to="/comics">
          Comics
        </StyledNavLink>
      </Nav>
    </StyledHeader>
  );
};

export default Header;
