import React from 'react';
import Search from './search';
import SessionFormContainer from './session_form_container';
import UserFormContainer from './user_form_container';
import { Route, Link, HashRouter, Redirect } from 'react-router-dom';

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this)
  }

  handleLogout(e) {
    e.preventDefault();
    this.props.logout()
  }

  render() {

    const sessionButtons = (this.props.currentUser.id) ? (
      <>
        <p>welcome user {this.props.currentUser.id}</p>
        <button onClick={this.handleLogout}>logout</button>
      </> 
    ) : (
      <>
        <Link className='login nav-bar-button' to='/login'>LOG IN</Link>
        <Link className='signup nav-bar-button' to='/signup'>SIGN UP</Link>
      </> 
    );

    return (
      <nav className="nav-bar">
        <main>
          <section className="logo">
            w
          </section>
          <Search />
          <section className="userMenu">
            <HashRouter>
              {sessionButtons}
              <Route 
                path='/login' 
                render={() => (this.props.currentUser.id ? <Redirect to="/"/> : <SessionFormContainer />) }
              />
              <Route
                path='/signup' 
                render={() => (this.props.currentUser.id ? <Redirect to="/" />  : <UserFormContainer />)}
              />
            </HashRouter>
          </section>
        </main>
      </nav>
    )
  }
}

export default NavBar;