import React from 'react';
import { Link, NavLink, Route, Switch } from 'react-router-dom';
import FeedListItem from "./feed_list_items";
import Review from './review';

class Profile extends React.Component {

  componentDidMount() {
    this.props.fetchUsername(this.props.username)
  }

  componentDidUpdate() {
    if (this.props.profileNotFound) {

    } else if (this.props.username !== this.props.user.username) {
      this.props.fetchUsername(this.props.username)
    } 
  }

  componentWillUnmount() {
    this.props.clearErrors();
  }

  handleDelete(e) {
    return this.props.deleteProduct(e.currentTarget.id)
      .then(() =>{
        this.props.fetchUsername(this.props.username)
      }
    )
  }

  render() {
    if (this.props.profileNotFound) {
      return (404)
    }

    const { username, id, upvote_ids, review_ids, product_ids, products, upvoted_products, upvoted_product_ids, profilePictureUrl, profileHeaderUrl, name } = this.props.user;
    
    const display = (username) ? (
      <section className='profile'>
        {/* <img src={profileHeaderUrl ? profileHeaderUrl : window.hp} alt="" className="header"/> */}
        {/* 



        background-image: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)), url("{profileHeaderUrl ? profileHeaderUrl : window.hp}");
        
        
        */}
        <header style={{ backgroundImage:  `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)), url(${profileHeaderUrl ? profileHeaderUrl : window.hp})` }}>
          <img src={profilePictureUrl ? profilePictureUrl : window.pp} className='profile-picture profile-picture-round' />
          <section className='user-info'>
            <div>
              <h1>{name ? name : username}</h1>
            </div>
            <div>
              <p className='profile-id'>{id}</p>
              <p>@{username}</p>
            </div>
            <div>
              <Link to={`/@${username}/reviews`}>
                {review_ids.length} Review{
                  review_ids.length === 1 ? '' : 's'
                }
              </Link>
              <Link to={`/@${username}/products`}>
                {product_ids.length} Product{
                  product_ids.length === 1 ? '' : 's'
                }
              </Link>
            </div>
          </section>
          {username === this.props.currentUser ? (
              <Link 
                className='edit-follow' 
                to={`/@${username}/edit`}
              >Edit</Link>
            ) : (
              <a 
                className='edit-follow' 
                onClick={() => { }}
              >Follow</a>
            )}
        </header>
        <main className='profile-container'>
          <section className="left-bar">
            <ul>
              <li>
                <NavLink exact to={`/@${username}`}>{upvote_ids.length} Upvote{upvote_ids.length === 1 ? '' : 's'}</NavLink>
              </li>
              <li>
              <NavLink to={`/@${username}/reviews`}>{review_ids.length} Review{review_ids.length === 1 ? '' : 's'}</NavLink>
              </li>
              <li>
                <NavLink to={`/@${username}/products`}>{product_ids.length} Product{product_ids.length === 1 ? '' : 's'} Created</NavLink>
              </li>
            </ul>
          </section>

          <section className="profile-details">

            <Switch>

              <Route
                path={'/@:username/products'}
                render={() => (
                  <>
                    <section className="upvoted-products">
                      <h1>{product_ids.length} Product{product_ids.length === 1 ? '' : 's'}</h1>
                      {/* product lists */}
                      {
                        product_ids.length > 0 ? product_ids.map((product_id, i) => {
                          let p = products[i][product_id];

                          return (
                            <FeedListItem
                              key={`${p.id}-${p.title}`}
                              openModal={this.props.openModal}
                              product={p}
                              loggedIn={this.props.currentUserId}
                              fromProfile={true}
                              handleDelete={this.handleDelete.bind(this)}
                            />
                          )
                        }) : (
                          <li className="feed-list-item" >
                            <a className='feed-list-item-container no-hover'>
                              no products 🎉
                            </a>
                          </li>)
                        }
                    </section>
                  </>
                )}
              />
              <Route
                path={'/@:username/reviews'}
                render={() => (
                  <>
                    <section className="upvoted-products">
                      <h1>{review_ids.length} Review{review_ids.length === 1 ? '' : 's'}</h1>


                      {
                        review_ids.length > 0 ? review_ids.map((review_id, i) => {
                          return <Review key={`review-${review_id}`} id={review_id} fromProfile={true} />
                        }
                        ) : (
                            <li className="feed-list-item" >
                              <a className='feed-list-item-container no-hover'>
                                no reviews 🎉
                              </a>
                            </li>)
                      }
                    </section>
                  </>
                )}
              />

              <Route
                path={'/@:username'}
                render={() => (
                  <>
                    <section className="upvoted-products">
                      
                      <h1>{upvote_ids.length} Upvote{upvote_ids.length === 1 ? '' : 's'}</h1>


                      {/* item lists */}
                      {
                        upvoted_product_ids.length > 0 ? upvoted_product_ids.map((product_id,i) => {
                          let p = upvoted_products[i][product_id];
                      
                          return (
                            <FeedListItem 
                              key={`${p.id}-${p.title}`} 
                              openModal={this.props.openModal} 
                              product={p} 
                              loggedIn={this.props.currentUserId }
                            />
                          )
                        }) :  (
                          <li className="feed-list-item" >
                              <a className='feed-list-item-container no-hover'>
                                  no upvotes 🎉
                              </a>
                          </li>)
                      }
                    </section>
                </>
                )}
          />
            </Switch>
            </section>

          <section className="right-bar">
          </section>

        </main>
      </section>
    ) : (this.props.errors.length > 0) ? (
      <>
        404 profile {this.props.user.username} not found
      </>
    ) : (
      null
    )

    return (
      <>
        {display}
      </>
    )
  }
}


export default Profile;