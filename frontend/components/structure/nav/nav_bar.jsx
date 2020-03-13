import React from 'react';
import Search from './search';
import SessionFormContainer from './session_form_container';
import UserFormContainer from './user_form_container';
import { Route, Link, Redirect, NavLink } from 'react-router-dom';

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
    const { currentUserId, currentUserName, profilePictureUrl } = this.props;
    
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
        {profilePictureUrl ? (
        <img 
          src={profilePictureUrl}
          onClick={this.props.openUserMenu} 
          alt={currentUserName[0]}
          className={`logo pastel-color-${color} usermenu-logo`}
          />
        ) : (
          <img
            src={window.pp}
            onClick={this.props.openUserMenu}
            alt={currentUserName[0]}
            className={`logo pastel-color-${color} usermenu-logo`}
          />
        )}
      </> 
    ) : (
      <>
          <a className='login nav-bar-button' onClick={() => this.props.openModal('login')}>LOG IN</a>
          <a className='signup nav-bar-button' onClick={() => this.props.openModal('signup')}>SIGN UP</a>
      </> 
    );

    return (
      <>
        <nav className="nav-bar">
          <main>
            <section alt='home' onClick={() => window.location.hash = "#/"} className="logo">
              w
            </section>
            {/* <Search /> */}
            <h1>Webhunt</h1>
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
        <Route
          path='/'
          render={() => this.props.userMenuStatus ? (
            <section onClick={
              this.props.closeUserMenu
              // e => e.stopPropagation()
            
            } className="user-menu-modal">
              <span>
                <ul className="usermenu">
                <div className="arrow-up"></div>
                  <li><NavLink activeClassName="active" to={`/@${currentUserName}`} >User Profile</NavLink></li>
                  <li><a onClick={this.handleLogout}>Logout</a></li>
                </ul>
              </span>
            </section>
          ) : (null)}
        />
      </>
    )
  }
}

export default NavBar;