import React, { Component } from 'react';
import * as Yup from 'yup';
import {
  Form, Field, Formik, ErrorMessage,
} from 'formik';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import Button from './Button';
import Error from './Error';

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')
    .required('Login is required'),
  password: Yup.string()
    .min(6, 'Must be more than 6 characters')
    .max(16, 'Must be less than 16 characters')
    .required('Password is required'),
});

const StyledError = styled(ErrorMessage)`
  display: block;
  color: red;
  font-size: 1.2rem;
  font-family: inherit;
  font-weight: normal;
  text-align: left;
  margin-bottom: 1rem;
`;

const StyledField = styled(Field)`
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  width: 100%;
  color: gray;
  border: 1px solid ${props => (props.error ? '#ff0000' : '#c9d0e1')};
  border-radius: 5px;
  padding: 1rem;
  cursor: pointer;
  box-sizing: border-box;
  font-size: 1.2rem;
  margin-bottom: 2rem;
  box-shadow: 0 8px 6px -6px black;
  &::placeholder {
    color: #ccc;
  }
`;

class LoginForm extends Component {
  state = {};

  render() {
    const {
      login, history, tab, error,
    } = this.props;
    return (
      <>
        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          validationSchema={validationSchema}
          onSubmit={(values, isValid) => {
            if (isValid) {
              login(values, history);
            }
          }}
        >
          {({ errors }) => (
            <Form>
              <StyledField error={errors.email} type="text" name="email" placeholder="Your email" />
              <StyledError component="span" name="email" />
              <StyledField
                error={errors.password}
                type="password"
                name="password"
                placeholder="Your password"
              />
              <StyledError component="span" name="password" />
              <Error tab={tab} error={error} />
              <Button name="SIGN-IN" />
            </Form>
          )}
        </Formik>
      </>
    );
  }
}

export default withRouter(LoginForm);
