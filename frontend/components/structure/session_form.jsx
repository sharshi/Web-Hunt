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
            <h3>{this.props.formType}</h3>
            <br/>
            <label htmlFor='password'>Username</label>
            <input id='password' type="text" />
            <label htmlFor='email'>Email</label>
            <input id='email' type="email" />
            <label htmlFor='password'>Password</label>
            <input id='password' type="password" />
            
          </form>
          <p className='other-session-link'>Did you want to {otherSessionLink}?</p>
        </span>
      </span>
    )
  }
}

export default SessionForm;