import React from 'react';
import { Link } from 'react-router-dom';
import FeedListItem from "./feed_list_items";

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

  render() {
    if (this.props.profileNotFound) {
      return (404)
    }

    const { username, id, upvote_ids, review_ids, product_ids, products, upvoted_products, upvoted_product_ids } = this.props.user;

    const display = (username) ? (
      <section className='profile'>
        {/* hello { this.props.user.username } */}
        <header>
          <span className='profile-picture profile-picture-round'></span>
          <section className='user-info'>
            <div>
              <h1>{username}</h1>
              {username === this.props.currentUser ? (
                <button>Edit</button>
              ) : (
                <button>Follow</button>
              )}
            </div>
            <div>
              <p className='profile-id'>{id}</p>
              <p>@{username}</p>
            </div>
            <div>
              <Link to='/'>{review_ids.length} Review{review_ids.length === 1 ? '' : 's'}</Link>
              <Link to='/'>{product_ids.length} Product{product_ids.length === 1 ? '' : 's'}</Link>
            </div>
          </section>
        </header>
        <main className='profile-container'>
          <section className="left-bar">
            <ul>
              <li>
                <Link to='/'>{upvote_ids.length} Upvote{upvote_ids.length === 1 ? '' : 's'}</Link>
              </li>
              <li>
                <Link to='/'>{review_ids.length} Review{review_ids.length === 1 ? '' : 's'}</Link>
              </li>
              <li>
                <Link to='/'>{product_ids.length} Product{product_ids.length === 1 ? '' : 's'} Created</Link>
              </li>
            </ul>
          </section>
          <section className="profile-details">

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
                    />
                  )
                }) : 'no upvotes'
              }
            </section>
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