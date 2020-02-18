import React from 'react';

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
    const display = (this.props.user.username) ? (
      <>
        hello { this.props.user.username }
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