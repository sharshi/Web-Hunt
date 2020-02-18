import React from 'react';

import FeedContainer from "./feed_container";
import SideBar from "./sidebar";
import ProductContainer from "./product_container";
import ProfileContainer from "./profile_container";

import { Route, Switch } from 'react-router-dom';
import ProductFormContainer from './new_product/product_form_container';

class Main extends React.Component {
  render() {
    return (
      <>
        <main className='main-content'>
          <Switch>
            <Route
              path={'/products/:id'}
              render={() => <ProductContainer />}
            />
            {/*<Route
              path={'/@:username'}
              render={() => <UserContainer />}
            /> */}
            <Route
              path='/posts/new'
              render={() => <ProductFormContainer />}
            />
            <Route
              path={'/@:username'}
              render={() => <ProfileContainer url={
                location.hash.split('@')[1]} />}
            />
            <Route
              path='/'
              render={() => (<>
                <FeedContainer />
                <SideBar />
              </>)}
              />

          </Switch>

        </main>
      </>
    )
  }
}

export default Main;