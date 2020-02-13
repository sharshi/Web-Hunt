import React from 'react';

import Feed from "./feed";
import SideBar from "./sidebar";

class Main extends React.Component {
  render() {
    return (
      <>
        <main className='main-content'>
          <Feed />
          <SideBar />
        </main>
      </>
    )
  }
}

export default Main;