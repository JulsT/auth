import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 700px;
  padding: 2rem;
  margin: auto;
  text-align: center;
  font-weight: bold;
  font-size: 1.5rem;
`;
const Inner = styled.div`
  text-align: left;
`;

const AboutPage = () => (
  <Container>
    <h2>So, about app...</h2>
    <Inner>
      {' '}
      <p>It is classic SPA, created with MERN stack.</p>
      <p>
        For the backend were used next technologies and packages:
        <ul>
          <li>express</li>
          <li>bcryptjs: used to hash passwords before we store them in our database</li>
          <li>jsonwebtoken: used for authorization</li>
          <li>mongoose: used to interact with MongoDB</li>
        </ul>
      </p>
      <p>
        Otherwise, for the frontend were used next technologies and packages:
        <ul>
          <li>redux - responsible for managing the client application&apos;s state</li>
          <li>axios - for making AJAX requests to the server</li>
          <li>formik - build forms in React, without the tears.</li>
          <li>validator Yup</li>
          <li>styled with styled-components</li>
        </ul>
      </p>
    </Inner>
  </Container>
);

export default AboutPage;
