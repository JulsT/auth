import React, { Component } from 'react';
import styled from 'styled-components';
import {
  Switch, Route, withRouter, Redirect,
} from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { logout, recieveUser } from './actions';
import PrivateRoute from './components/PrivateRoute';
import Header from './components/Header';
import Footer from './components/Footer';
import HeroPage from './containers/HeroPage';
import AboutPage from './containers/AboutPage';
import SigninPage from './containers/SigninPage';
import ProfilePage from './containers/ProfilePage';

const Container = styled.div`
  margin: 0 auto;
  flex: 1;
  width: 100%;
  height: auto;
`;

class App extends Component {
  componentDidMount() {
    const token = localStorage.getItem('token');
    // eslint-disable-next-line no-shadow
    const { recieveUser } = this.props;
    if (token) {
      recieveUser(token);
    }
  }

  render() {
    // eslint-disable-next-line react/prop-types
    // eslint-disable-next-line no-shadow
    const { isAuthenticated, logout } = this.props;
    return (
      <>
        <Header isAuthenticated={isAuthenticated} logout={logout} />
        <Container>
          <Switch>
            <Route path="/" exact component={HeroPage} />
            <Route path="/about" component={AboutPage} />
            <Route
              path="/signin"
              render={() => (isAuthenticated ? <Redirect to="/profile" /> : <SigninPage />)}
            />
            <PrivateRoute
              path="/profile"
              component={ProfilePage}
              // eslint-disable-next-line react/prop-types
              isAuthenticated={isAuthenticated}
            />
          </Switch>
        </Container>
        <Footer />
      </>
    );
  }
}

App.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired,
  recieveUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.isAuthenticated,
  token: state.token,
});
const mapDispatchToProps = (dispatch) => bindActionCreators({ logout, recieveUser }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(App));
