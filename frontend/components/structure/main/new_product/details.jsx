import React from "react";

class Details extends React.Component {
  render() {
    if (this.props.currentStep !== 2) {
      return null;
    }
    const previewImage = (this.props.logo) ? (
      <img src={URL.createObjectURL(this.props.logo)} />
    ) : (
      <img />
    );  

    return (
      <section className="form-group">
        <label htmlFor="title">Name of the tool <span>- required</span></label>
        <input
          className='form-control'
          id='title'
          type='text'
          name='title'
          placeholder='Name of the tool'
          value={this.props.title}
          onChange={this.props.handleChange}
          required
        />
        <label htmlFor="tagline">Tagline <span>- required</span></label>
        <input
          className='form-control'
          id='tagline'
          type='text'
          name='tagline'
          placeholder='Short catchy tagline for the tool'
          value={this.props.tagline}
          onChange={this.props.handleChange}
          required
        />
        <label htmlFor="topics">Topics <span></span></label>
        <input
          className='form-control'
          id='topics'
          type='text'
          name='topics'
          placeholder='Add a topic'
          value={this.props.topic}
          onChange={this.props.handleChange}
        />
        <section className="logo-section">
          <label htmlFor="logo">Logo Upload <span>- required</span></label>
          <input
            className='form-control logo'
            type="file" 
            id="logo"
            name='logo'
            accept="image/gif, image/jpeg, image/png"
            files={this.props.logo}
            onChange={this.props.handleChange}
            required
            />
          {previewImage} 
            <p>Recommended size: 240x240 <br/>
            JPG, PNG, GIF. Max size: 2MB</p>
        </section>
        <label htmlFor="status">Status</label>
        <input 
          className='form-control'
          type="checkbox" 
          id="status"
          name='status'
          value={!this.props.submit}
          onChange={this.props.handleChange}
        /><p className='status'>This tool hasn't been released yet</p>
      </section>
    )
  }
}

export default Details;