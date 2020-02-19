import React from "react";
import { connect } from "react-redux";
import { fetchUser } from "../../../actions/session_actions";

class ProfilePicture extends React.Component {
  constructor(props) {
    super(props);
  }

  handleClick() {
    // go to profile
  }

  componentDidMount() {
    if (!this.props.user.ProfilePicture) {
      this.props.fetchUser(this.props.id)
    }
  }

  render() {
    if (!this.props.ProfilePicture) {
     return  <img src={window.pp} className='ppr' alt="" />
    }

    return (
      <img src={this.props.ProfilePicture} className='ppr' alt=""/>
    )
  }
}

const mapStateToProps = state => {
  const user = state.session.currentUser.id ? state.entities.users[state.session.currentUser.id] : window.pp;
  return ({
    user: user
  })
}

const mapDispatchToProps = dispatch => ({
  fetchUser: id => dispatch(fetchUser(id))
})


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfilePicture)