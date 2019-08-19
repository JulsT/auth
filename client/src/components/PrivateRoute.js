import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

const ProtectedRoute = ({ component: Component, isAuthenticated, ...rest }) => (
  <Route
    // eslint-disable-next-line react/jsx-props-no-spreading
    {...rest}
    render={(props) => (isAuthenticated ? (
    // eslint-disable-next-line react/jsx-props-no-spreading
      <Component {...props} />
    ) : (
      <Redirect
        to={{
          pathname: '/signin',
          state: { from: props.location },
        }}
      />
    ))}
  />
);
ProtectedRoute.propTypes = {
  component: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};

export default ProtectedRoute;
