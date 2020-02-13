import React from 'react';
import NavBarContainer from "./structure/nav/nav_bar_container";
import Main from "./structure/main/main";
import Footer from './structure/footer/footer';
import Modal from './structure/main/modal'

class App extends React.Component {
  render() {
    return (
      <>
        <Modal />
        <NavBarContainer />
        <Main />
        <Footer />
      </>
    )
  }
}

export default App;