import React, { Component } from 'react';
import * as Yup from 'yup';
import {
  Form, Field, Formik, ErrorMessage,
} from 'formik';
import { CountryDropdown } from 'react-country-region-selector';
import styled from 'styled-components';
import Button from './Button';

const validationSchema = Yup.object().shape({
  name: Yup.string(),
  email: Yup.string()
    .email('Invalid email address')
    .required('Login is required'),
  password: Yup.string()
    .min(6, 'Must be more than 6 characters')
    .max(16, 'Must be less than 16 characters'),
  country: Yup.string(),
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
const CustomError = styled.span`
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
const dropdownStyles = {
  width: '100%',
  marginBottom: '2rem',
  padding: '5px 16px',
  height: '40px',
  fontSize: '1.5rem',
  color: 'gray',
  border: '1px #c9d0e1 solid',
  backgroundColor: 'white',
  boxShadow: '0 8px 6px -6px black',
};

class ProfileForm extends Component {
  state = {};

  render() {
    const { user, editUser, error } = this.props;
    let propsValues = {
      name: '', email: '', password: '', country: '',
    };
    if (user) {
      const { password, ...userProps } = user;
      propsValues = { ...propsValues, ...userProps };
    }
    return (
      <>
        <Formik
          enableReinitialize={true}
          initialValues={propsValues}
          validationSchema={validationSchema}
          onSubmit={(values, isValid) => {
            if (isValid) {
              let user;
              if (values.password !== '') {
                user = {
                  name: values.name,
                  email: values.email,
                  password: values.password,
                  country: values.country,
                };
              } else {
                user = {
                  name: values.name,
                  email: values.email,
                  country: values.country,
                };
              }
              editUser(user);
            }
          }}
        >
          {({
            values, errors, handleChange,
          }) => (
            <Form>
              <StyledField type="text" name="name" placeholder="Your name" />
              <StyledField error={errors.email} type="text" name="email" placeholder="Your email" />
              <StyledError component="span" name="email" />
              <StyledField
                error={errors.password}
                type="password"
                name="password"
                placeholder="Change password"
              />
              <StyledError component="span" name="password" />
              <CountryDropdown
                style={dropdownStyles}
                defaultOptionLabel="Select a country, man."
                value={values.country}
                name="country"
                onChange={(_, val) => handleChange(val)}
              />
              {error ? <CustomError>{error}</CustomError> : null}

              <Button name="EDIT" type="submit" />
            </Form>
          )}
        </Formik>
      </>
    );
  }
}

export default ProfileForm;
