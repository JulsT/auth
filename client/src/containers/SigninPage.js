import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { signup, login } from '../actions';
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

class SigninPage extends Component {
  state = {};

  render() {
    const { login, error, signup } = this.props;
    return (
      <Container>
        <Tabs>
          <div label="Sign-In">
            <LoginForm key="sign-in" login={login} error={error} />
          </div>
          <div label="Sign-Up">
            <SignupForm key="sign-up" signup={signup} error={error} />
          </div>
        </Tabs>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.isAuthenticated,
  error: state.error,
});

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    signup,
    login,
  },
  dispatch,
);
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SigninPage);
