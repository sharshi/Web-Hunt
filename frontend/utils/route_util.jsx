import React from 'react';
import { withRouter, Route, Redirect } from 'react-router-dom';
import { connect } from "react-redux";

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


// Mine
// how to tell its me
const Mine = ({ component: Component, path, usernameFromUrl, usernameFromSession, exact }) => {
  return(
  <Route path={path} exact={exact} render={(props) => (
    (usernameFromUrl === usernameFromSession) ? (
      <Component {...props} />
    ) : (
      <Redirect to="/" />
    )
  )} />
)};


const mapStateToProps = (state, ownProps) => {
  const usernameFromUrl = ownProps.path === '/@:username/edit' ? (
    ownProps.location.pathname.split('@')[1].split('/')[0]
  ) : (
    null
  )
  return ({
  loggedIn: Boolean(state.session.currentUser.id),
  usernameFromUrl: usernameFromUrl,
  usernameFromSession: state.session.currentUser.username
})} ;

export const AuthRoute = withRouter(
  connect(
    mapStateToProps
  )(Auth));

export const ProtectedRoute = withRouter(
  connect(
    mapStateToProps
  )(Protected));


export const MineRoute = withRouter(
  connect(
    mapStateToProps
  )(Mine));
