import React from 'react';
import * as Yup from 'yup';
import {
  Form, Field, Formik, ErrorMessage,
} from 'formik';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
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
  passwordConfirm: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords are not the same!')
    .required('Password confirmation is required!'),
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
  border: 1px solid ${(props) => (props.error ? '#ff0000' : '#c9d0e1')};
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

const SignupForm = ({
  signup, history, tab, error,
}) => (
  <>
    <Formik
      initialValues={{
        email: '',
        password: '',
        passwordConfirm: '',
      }}
      validationSchema={validationSchema}
      onSubmit={(values, isValid) => {
        if (isValid) {
          const user = { email: values.email, password: values.password };
          signup(user, history);
        }
      }}
    >
      {({ errors, touched }) => (
        <Form>
          <StyledField
            error={touched.email && errors.email}
            type="text"
            name="email"
            placeholder="Your email"
          />
          <StyledError component="span" name="email" />
          <StyledField
            error={touched.password && errors.password}
            type="password"
            name="password"
            placeholder="Your password"
          />
          <StyledError component="span" name="password" />
          <StyledField
            error={touched.passwordConfirm && errors.passwordConfirm}
            type="password"
            name="passwordConfirm"
            placeholder="Repeat password"
          />
          <StyledError component="span" name="passwordConfirm" />
          <Error tab={tab} message={error} />
          <Button name="SIGN-UP" />
        </Form>
      )}
    </Formik>
  </>
);

SignupForm.propTypes = {
  signup: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }),
  tab: PropTypes.string.isRequired,
  error: PropTypes.string,
};

export default withRouter(SignupForm);
