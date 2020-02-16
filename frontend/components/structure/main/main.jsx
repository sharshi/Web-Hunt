import React from 'react';

import Feed from "./feed";
import SideBar from "./sidebar";
import ProductContainer from "./product_container";

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
            <Route
              path='/posts/new'
              render={() => <ProductFormContainer />}
            />
            <Route
              path='/'
              render={() => (<>
                <Feed />
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