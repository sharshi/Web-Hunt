import React from 'react';

const NavBar = props => {

  return (
    <nav>
      <section className="logo">
        web-hunt logo
      </section>
      <section className="searchField">
        {/* turn into form component */}
        search field
      </section>
      <section className="navMenu">
        {/* post links and profile picture */}
        {/* split into separate component  */}
        {/* maybe put behind Auth / Protected routes  */}
        nav menu
      </section>
    </nav>
  )
}

export default NavBar;