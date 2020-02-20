import React from 'react';
import { withRouter } from "react-router-dom";
class ProfileForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.user,
      loaded: false
    }
    
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillUnmount() {
    this.props.clearErrors();
  }

  componentDidMount() {
    this.props.fetchUsername(this.props.currentUser)
  }

  componentDidUpdate() {
    if (!this.state.loaded) {
      const { user } = this.props;
      this.setState({ 
        user,
        loaded: true
       });
    }
  }

  handleSubmit(e) {
    e.preventDefault();

    const {id, username, profile_picture, profile_header, email } = this.props.user;

    const formData = new FormData();
    // formData.append('user[id]', id);
    username ? 
      formData.append('user[username]', username): null;
    profile_picture ?
      formData.append('user[profile_picture]', profile_picture): null;
    profile_header ?
      formData.append('user[profile_header]', profile_header): null;
    
    formData.append('user[email]', email);

    this.props.updateUser(formData, id).then(({user})=> {
      this.props.history.push(`/@${user.username}`)
    })

  }

  handleChange(e) {
    
    const { name, value } = e.target;
    let user = this.state.user;
    if (name === 'profile-picture' ) {
      user['profile_picture'] = e.target.files[0]
    } else if ( name === 'profile-header') {
      user['profile_header'] = e.target.files[0]
    } else {
      user[name] = value;
    }

    this.setState({
      user
    });
  }

  render() {
    const { username, profile_picture, profile_header, email, profilePictureUrl, profileHeaderUrl} = this.state.user;
  
    const previewProfilePicture = (profile_picture) ? (
        <img className='ppr' src={URL.createObjectURL(profile_picture)} />
    ) : (profilePictureUrl) ? (
      <img className='ppr' src={profilePictureUrl} />
      )  : (
        <img className='ppr' src={window.pp} />
      );  

    const previewProfileHeader = (profile_header) ? (
      <img className='profile-header header-preview' src={URL.createObjectURL(profile_header)} />
        ) : (profileHeaderUrl) ? (
        <img className='header-preview' src={profileHeaderUrl} />
        ) : (
          <img className='header-preview' src={window.hp} />
        ); 

    const form = (username) ? (
      <section className='profile-edit'>
        <h1>Settings</h1>
        <form onSubmit={this.handleSubmit}>
          {/* <label htmlFor="name">Name</label>
          <input
            className='form-control name'
            type="text"
            id="name"
            name='name'
            value={this.state.name}
            onChange={this.handleChange}
            required
          /> */}
          <label htmlFor="username">Username</label>
          <input
            className='form-control username'
            type="text"
            id="username"
            name='username'
            value={username}
            onChange={this.handleChange}
            required
          />
          <label htmlFor="profile-picture">Profile Picture</label>
          <input
            className='form-control profile-picture'
            type="file"
            id="profile-picture"
            name='profile-picture'
            file={profile_picture}
            accept="image/jpeg, image/png"
            onChange={this.handleChange} 
          />
          {previewProfilePicture}
          <label htmlFor="email">Email</label>
          <input
            className='form-control email'
            type="text"
            id="email"
            name='email'
            value={email}
            onChange={this.handleChange}
            required
          />
          <label htmlFor="profile-header">Profile Header</label>
          <input
            className='form-control profile-header'
            type="file"
            id="profile-header"
            name='profile-header'
            file={profile_header}
            accept="image/jpeg, image/png"
            onChange={this.handleChange}
          />
          {previewProfileHeader}
          <button>Update</button>
        </form>
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
        {<section className='profile-edit'>
          <h1>Settings</h1>
          <form onSubmit={this.handleSubmit}>
            {/* <label htmlFor="name">Name</label>
          <input
            className='form-control name'
            type="text"
            id="name"
            name='name'
            value={this.state.name}
            onChange={this.handleChange}
            required
          /> */}
            <label htmlFor="username">Username</label>
            <input
              className='form-control username'
              type="text"
              id="username"
              name='username'
              value={username}
              onChange={this.handleChange}
              required
            />
            <label htmlFor="profile-picture">Profile Picture</label>
            <input
              className='form-control profile-picture'
              type="file"
              id="profile-picture"
              name='profile-picture'
              file={profile_picture}
              accept="image/jpeg, image/png"
              onChange={this.handleChange}
            />
            {previewProfilePicture}
            <label htmlFor="email">Email</label>
            <input
              className='form-control email'
              type="text"
              id="email"
              name='email'
              value={email}
              onChange={this.handleChange}
              required
            />
            <label htmlFor="profile-header">Profile Header</label>
            <input
              className='form-control profile-header'
              type="file"
              id="profile-header"
              name='profile-header'
              file={profile_header}
              accept="image/jpeg, image/png"
              onChange={this.handleChange}
            />
            {previewProfileHeader}
            <button>Update</button>
          </form>
        </section>}
      </>
    )
  }
}


export default withRouter(ProfileForm);