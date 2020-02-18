import React from 'react';
import { Link } from 'react-router-dom';

class Profile extends React.Component {

  componentDidMount() {
    this.props.fetchUsername(this.props.username)
  }

  componentWillUnmount() {
    this.props.clearErrors();
  }

  render() {
    // if (this.props.profileNotFound) {
    //   return (404)
    // }
    const { username, id, upvotes, upvoted_product_ids, review_ids, product_ids } = this.props.user;

    const display = (username) ? (
      <>
        {/* hello { this.props.user.username } */}
        <header>
          <span>profile picture</span>
          <section>
            <div>
              <h1>{username}</h1>
              {username === this.props.currentUser ? (
                <button>Edit</button>
              ) : (
                <button>Follow</button>
              )}
            </div>
            <div>
              <p>{id}</p>
              <p>@{username}</p>
            </div>
            <div>
              <Link to='/'>{review_ids.length} Review{review_ids.length === 1 ? '' : 's'}</Link>
              <Link to='/'>{product_ids.length} Product{product_ids.length === 1 ? '' : 's'}</Link>
            </div>
          </section>
          <main>
            <section className="left-bar">

            </section>
            <section className="profile-details">
              {
                upvotes ? `${upvoted_product_ids.length} upvotes` : 'no upvotes'
              }
            </section>
            <section className="right-bar">

            </section>

          </main>
        </header>
      </>
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