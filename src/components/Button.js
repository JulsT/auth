import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button.attrs(props => ({
  type: props.buttonType,
}))`
  position: relative;
  margin-left: 0.625rem;
  padding: 1rem 2rem;
  border: none;
  background-color: slategray;
  border-radius: 0.25rem;
  color: white;
  font-size: 1.8rem;
  font-weight: 600;
  overflow: hidden;
  z-index: 1;
  box-shadow: 0 8px 6px -6px black;
`;

const Button = ({ name, type }) => <StyledButton type={type}>{name}</StyledButton>;

export default Button;
