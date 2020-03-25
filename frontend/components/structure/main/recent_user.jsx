import React from 'react';
import { connect } from 'react-redux';
import { fetchUser } from "../../../actions/session_actions";
import { Link } from 'react-router-dom';

class RecentUser extends React.Component {
  componentDidMount() {
    // if user in undefined fetch user
    const { user } = this.props;

    if (!user) {
      this.props.fetchUser(this.props.id)
    }
  }

  render() {
    // if user in undefined return null
    const {user} = this.props;
    if (!user) return null;
    const { username, profilePictureUrl, profileHeaderUrl } = user;
    return (
      <Link to={`/@${username}`}>
        <article style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)), url(${profileHeaderUrl ? profileHeaderUrl : window.hp})` }} className='recent-user'>
          <img className='ppr' src={profilePictureUrl} alt={`click to see @${username}'s profile`}/>
          <a>@{username}</a>
        </article>
      </Link>
    )
  }
}

const mstp = (state, op) => ({
  user: state.entities.users[op.id]
})

const mdtp = dispatch => ({
  fetchUser: id => dispatch(fetchUser(id))
})

export default connect(
  mstp,
  mdtp
)(RecentUser);