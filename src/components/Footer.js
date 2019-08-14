import React from 'react';
import styled from 'styled-components';

const StyledFooter = styled.footer`
  text-align: center;
  color: white;
  background: #ff0000;
  padding: 1.5rem;
`;

const Footer = () => (
  <StyledFooter>
    <p>© 2019 Copyright: Juls</p>
  </StyledFooter>
);

export default Footer;
