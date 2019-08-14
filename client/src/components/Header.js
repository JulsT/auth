import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Navbar from './NavBar';

const Logo = styled.h1`
  transform: skew(-7deg);
  margin-left: 2rem;
  position: relative;
  a {
    padding: 1rem;
    background: #ff0000;
    color: white;
  }
  @media (max-width: 600px) {
    margin: 1rem 0;
    text-align: center;
  }
`;

const StyledHeader = styled.div`
  border-bottom: 10px solid #393939;
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: stretch;
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    justify-content: center;
  }
`;

const Header = ({ logout, isAuthenticated }) => (
  <StyledHeader>
    <Logo>
      {' '}
      <Link to="/">TestApp</Link>
    </Logo>
    <Navbar logout={logout} isAuthenticated={isAuthenticated} />
  </StyledHeader>
);

export default Header;
