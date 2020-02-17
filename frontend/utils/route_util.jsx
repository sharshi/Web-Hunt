import React from 'react';
import { withRouter } from 'react-router-dom';

// not logged in
const Auth = ({ component: Component, path, loggedIn, exact }) => (
  <Route path={path} exact={exact} render={(props) => (
    !loggedIn ? (
      <Component {...props} />
    ) : (
      <Redirect to="/" />
    )
  )} />
);

// logged in
const Protected = ({ component: Component, path, loggedIn, exact }) => (
  <Route path={path} exact={exact} render={(props) => (
    loggedIn ? (
      <Component {...props} />
    ) : (
      <Redirect to="/login" />
    )
  )} />
);

const mapStateToProps = state => ({
  loggedIn: Boolean(state.session.id)
}) ;

export const AuthRoute = withRouter(
  connect(
    mapStateToProps
  )(Auth));

export const ProtectedRoute = withRouter(
  connect(
    mapStateToProps
  )(Protected));
