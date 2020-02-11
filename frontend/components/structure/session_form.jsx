import React from 'react';
import { Link } from 'react-router-dom';

class SessionForm extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const otherSessionLink = (this.props.formType === 'signup') ? (
      <Link to='/login'>login</Link>
    ) : (
      <Link to='/signup'>signup</Link>
    )

    return (
      <span className='modal-screen'>
        <Link className="x" to='/' >X</Link>
        <span className='session-modal'>
          <span className="logo">w</span>
          <form>
            {this.props.formType}
            <br/>
            <label>Username
              <input type="text" />
            </label>
            <br />
            <label>Email
              <input type="email" />
            </label>
            <br />
            <label>Password
              <input type="password" />
            </label>
          </form>
          <p>Did you want to {otherSessionLink}?</p>
        </span>
      </span>
    )
  }
}

export default SessionForm;