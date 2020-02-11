import React from 'react';
import { Link, useHistory } from 'react-router-dom';

class SessionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleDemoSubmit = this.handleDemoSubmit.bind(this)
    // this.close = this.close.bind(this);
  }

  handleChange(type) {
    return e => this.setState({
      [type]: e.target.value
    })
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.action(this.state);
  }

  handleDemoSubmit(e) {
    e.preventDefault();
    this.props.action({
      username: 'sharshi',
      password: 'sharshi55'
    });
  }

  close(e) {
    if (e.target.className !== 'modal-screen') {
      return;
    }
    window.location.hash = "#/";
  }

  render() {
    const otherForm = this.props.formType === 'signup' ? 'login' : 'signup';
    
    const emailField = (this.props.formType === 'signup') ? (
      <>
        <label htmlFor='email'>Email</label>
        <input onChange={this.handleChange('email')} id='email' type="email" />
      </>
    ) : (null)

    const errors = this.props.errors ? (
      this.props.errors.map(error => {
        return (
          <li key={error}>{error}</li>
        )
      })
    ) : (
      []
    )
    
    const submitButtons = (this.props.formType === 'signup') ? (
      < button > { this.props.desc }</button>
    ) : (
      <>
        < button >{this.props.desc}</button>
        < button onClick={this.handleDemoSubmit}>Demo user</button>
      </>
    )

    return (
      <span onClick={this.close} className='modal-screen'>
        <Link className="x" to='/' >X</Link>
        <span className='session-modal'>

          <form onSubmit={this.handleSubmit}>
            <span className="logo">w</span>

            <h3>{this.props.formType}</h3>

            <label htmlFor='username'>Username</label>
            <input 
              onChange={this.handleChange('username')} 
              id='username' 
              type="text" 
            />

            {emailField}

            <label htmlFor='password'>Password</label>
            <input 
              onChange={this.handleChange('password')}
              id='password' 
              type="password" 
            />

            <ul className='errors-list'>{errors}</ul>
            {submitButtons}
          </form>

          <p className='other-session-link'>Did you want to {<Link to={`/${otherForm}`}>{otherForm}</Link>}?</p>
        </span>
      </span>
    )
  }
}

export default SessionForm;