import React from 'react';
import Search from './search';
import SessionFormContainer from './session_form_container';
import UserFormContainer from './user_form_container';
import { Route, Link, Redirect } from 'react-router-dom';

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
    const { currentUserId, currentUserName } = this.props;
    const colors = ['red', 'orange', 'yellow', 'green', 'blue'];
    const color = colors[Math.floor(Math.random() * colors.length)  ]

    const sessionButtons = (currentUserId) ? (
      <>
        <button onClick={this.handleLogout}>templogout</button>
        <Link to='/posts/new' className='new-post-link' >Post</Link>
        <section alt='user' onClick={() => alert('show menu')} className={`logo pastel-color-${color}`}>{currentUserName[0]}</section>
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
          <section alt='home' onClick={() => window.location.hash = "#/"} className="logo">
            w
          </section>
          <Search />
          <section className="userMenu">
            {sessionButtons}
            <Route 
              path='/login' 
              render={() => (currentUserId ? <Redirect to="/"/> : <SessionFormContainer />) }
            />
            <Route
              path='/signup' 
              render={() => (currentUserId ? <Redirect to="/" />  : <UserFormContainer />)}
            />
          </section>
        </main>
      </nav>
    )
  }
}

export default NavBar;