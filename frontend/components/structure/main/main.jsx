import React from 'react';

import FeedContainer from "./feed_container";
import SideBar from "./sidebar";
import ProductContainer from "./product_container";

import { Route, Switch } from 'react-router-dom';
import ProductFormContainer from './new_product/product_form_container';

import { connect } from "react-redux";
import { MineRoute, ProtectedRoute } from '../../../utils/route_util';

import ProfileContainer from "./profile_container";
import EditProfileContainer from "./edit_profile_container";

class Main extends React.Component {
  render() {
    return (
      <>
        <main className='main-content'>
          <Switch>
            {/* dont show products page if already in modal */}
            {this.props.allow ? (
            <Route
              path={'/products/:id'}
              render={() => <ProductContainer /> }
            />
            ) : (null)}
            <ProtectedRoute
              path='/posts/new'
              component={() => <ProductFormContainer />}
            />
            <MineRoute
              path={'/@:username/edit'}
              component={() => <EditProfileContainer url={
                location.hash.split('@')[1].split('/')[0]} />}
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



const mapStateToProps = state => {
  return ({
    allow: state.ui.modal[0] !== 'product'
  })
}

// const mapDispatchToProps = dispatch => ({

// })


export default connect(
  mapStateToProps,
  // mapDispatchToProps
)(Main)