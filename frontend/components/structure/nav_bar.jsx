import React from 'react';
import Search from './search';
import SessionForm from './session_form';
import { Route, Link, HashRouter } from 'react-router-dom';
const NavBar = props => {

  const signinModal = (
    <h1></h1>
  )

  return (
    <nav className="nav-bar">
      <main>
        <section className="logo">
          w
        </section>
        <Search />
        <section className="userMenu">
          <HashRouter>
            <Link className='login nav-bar-button' to='/login'>LOG IN</Link>
            <Link className='signup nav-bar-button' to='/signup'>SIGN UP</Link>
            <Route 
              path='/login' 
              render={() => <SessionForm formType='login' />}  
            />
            <Route
              path='/signup' 
              render={() => <SessionForm formType='signup' />}  
            />
          </HashRouter>
        </section>
      </main>
    </nav>
  )
}

export default NavBar;