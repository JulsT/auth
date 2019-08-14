import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ProfileForm from '../components/ProfileForm';
import { editUser } from '../actions';

const Container = styled.div`
  max-width: 700px;
  padding: 2rem;
  margin: auto;
  text-align: center;
  font-weight: bold;
  font-size: 1.2rem;
`;

class ProfilePage extends Component {
  state = {};

  render() {
    // eslint-disable-next-line no-shadow
    // eslint-disable-next-line react/prop-types
    const { user, editUser, error } = this.props;
    return (
      <Container>
        Edit your Profile
        <ProfileForm user={user} editUser={editUser} error={error} />
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  token: state.token,
  error: state.error,
});

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    editUser,
  },
  dispatch,
);
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProfilePage);
