import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const StyledNav = styled.ul`
  margin: 0;
  padding: 0;
  display: flex;
  justify-self: end;
  font-size: 2rem;
  li {
    display: flex;
    list-style-type: none;
    a,
    span {
      padding: 1rem 3rem;
      display: flex;
      align-items: center;
      position: relative;
      text-transform: uppercase;
      font-weight: 900;
      font-size: 1em;
      background: none;
      border: 0;
      cursor: pointer;
      &:before {
        content: '';
        width: 2px;
        background: lightgrey;
        height: 100%;
        left: 0;
        position: absolute;
        transform: skew(-20deg);
        top: 0;
        bottom: 0;
      }
      &:after {
        height: 2px;
        background: red;
        content: '';
        width: 0;
        position: absolute;
        transform: translateX(-50%);
        transition: width 0.4s;
        transition-timing-function: cubic-bezier(1, -0.65, 0, 2.31);
        left: 50%;
        margin-top: 2rem;
      }
      &:hover,
      &:focus {
        outline: none;
        &:after {
          width: calc(100% - 60px);
        }
        @media (max-width: 600px) {
          &:after {
            margin-top: 1rem;
            width: calc(100% - 55px);
          }
        }
      }
    }
  }
  @media (max-width: 600px) {
    border-top: 2px solid lightgray;
    width: 100%;
    justify-content: center;
    font-size: 1.5rem;
  }
`;
const Navbar = ({ logout, isAuthenticated }) => (
  <StyledNav>
    <li>
      <Link to="/">Home</Link>
    </li>
    <li>
      <Link to="/about">About</Link>
    </li>
    {isAuthenticated ? (
      <li>
        <Link to="/profile">Profile</Link>
      </li>
    ) : (
      <li>
        <Link to="/signin">Sign-in</Link>
      </li>
    )}
    {isAuthenticated && (
      <li>
        <span onClick={logout} onKeyDown={logout} role="button" tabIndex="0">
          Logout
        </span>
      </li>
    )}
  </StyledNav>
);

export default Navbar;
