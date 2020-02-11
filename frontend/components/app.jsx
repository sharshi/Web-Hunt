import React from 'react';
import NavBarContainer from "./structure/nav/nav_bar_container";
import Feed from "./structure/main/feed";
import Footer from './structure/footer/footer';

class App extends React.Component {
  render() {
    return (
      <>
        <NavBarContainer />
        <main className='main-content'>
          <Feed />
        </main>
        <Footer />
      </>
    )
  }
}

export default App;