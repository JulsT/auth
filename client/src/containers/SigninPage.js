import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { signupRequest, loginRequest } from '../actions';
import Tabs from '../components/Tabs';
import LoginForm from '../components/LoginForm';
import SignupForm from '../components/SignupForm';

const Container = styled.div`
  max-width: 700px;
  padding: 2rem;
  margin: auto;
  text-align: center;
  font-weight: bold;
  font-size: 1.2rem;
`;

// eslint-disable-next-line no-shadow
const SigninPage = ({ loginRequest, error, signupRequest }) => (
  <Container>
    <Tabs>
      <div label="Sign-In">
        <LoginForm key="sign-in" login={loginRequest} error={error} />
      </div>
      <div label="Sign-Up">
        <SignupForm key="sign-up" signup={signupRequest} error={error} />
      </div>
    </Tabs>
  </Container>
);

SigninPage.propTypes = {
  loginRequest: PropTypes.func.isRequired,
  error: PropTypes.string,
  signupRequest: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.isAuthenticated,
  error: state.error,
});

const mapDispatchToProps = (dispatch) => bindActionCreators(
  {
    signupRequest,
    loginRequest,
  },
  dispatch,
);
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SigninPage);
