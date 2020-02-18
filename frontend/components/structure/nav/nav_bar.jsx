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
        <Link 
          to='/posts/new' 
          className='new-post-link' 
        >Post</Link>
        <span className='bell'>
          <i className="fas fa-bell fa-sm"></i>
        </span>
        <section alt='user' className={`logo pastel-color-${color} usermenu-logo`}>{currentUserName[0]}
          <ul className="usermenu">
            <li><Link to={`/@${currentUserName}`} >User Profile</Link></li>
            <li><a onClick={this.handleLogout}>Logout</a></li>
          </ul>
        </section>
      </> 
    ) : (
      <>
          <a className='login nav-bar-button' onClick={() => this.props.openModal('login')}>LOG IN</a>
          <a className='signup nav-bar-button' onClick={() => this.props.openModal('signup')}>SIGN UP</a>
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
            {/* <Route 
              path='/login' 
              render={() => (currentUserId ? <Redirect to="/"/> : <SessionFormContainer />) }
            />
            <Route
              path='/signup' 
              render={() => (currentUserId ? <Redirect to="/" />  : <UserFormContainer />)}
            /> */}
          </section>
        </main>
      </nav>
    )
  }
}

export default NavBar;