import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import ProfileForm from '../components/ProfileForm';
import { editUserRequest } from '../actions';
import Error from '../components/Error';

const Container = styled.div`
  max-width: 700px;
  padding: 2rem;
  margin: auto;
  text-align: center;
  font-weight: bold;
  font-size: 1.2rem;
`;

const ProfilePage = ({
  // eslint-disable-next-line no-shadow
  user,
  // eslint-disable-next-line no-shadow
  editUserRequest,
  error,
  editUserSuccess,
}) => (
  <Container>
    Edit your Profile
    <ProfileForm user={user} editUser={editUserRequest} error={error} />
    <Error successMsg={editUserSuccess} message="User edited" />
  </Container>
);

ProfilePage.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
    password: PropTypes.string,
    country: PropTypes.string,
  }),
  editUserRequest: PropTypes.func.isRequired,
  error: PropTypes.string,
  editUserSuccess: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  user: state.user,
  token: state.token,
  error: state.error,
  editUserSuccess: state.editUserSuccess,
});

const mapDispatchToProps = (dispatch) => bindActionCreators(
  {
    editUserRequest,
  },
  dispatch,
);
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProfilePage);
