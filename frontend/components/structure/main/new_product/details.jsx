import React from "react";

class Details extends React.Component {
  render() {
    if (this.props.currentStep !== 2) {
      return null;
    }

    return (
      <section className="form-group">
        <label htmlFor="title">Name of the tool</label>
        <input
          className='form-control'
          id='title'
          type='text'
          name='title'
          placeholder='Name of the tool'
          value={this.props.title}
          onChange={this.props.handleChange}
        />
        <label htmlFor="tagline">Tagline</label>
        <input
          className='form-control'
          id='tagline'
          type='text'
          name='tagline'
          placeholder='Short catchy tagline for the tool'
          value={this.props.tagline}
          onChange={this.props.handleChange}
        />
        <label htmlFor="topics">Topics</label>
        <input
          className='form-control'
          id='topics'
          type='text'
          name='topics'
          placeholder='Add a topic'
          value={this.props.topic}
          onChange={this.props.handleChange}
        />
        <label htmlFor="logo">Logo</label>
        <input
          className='form-control'
          type="file" 
          id="logo"
          name='logo'
          value={this.props.logo}
          onChange={this.props.handleChange}
        />
        <label htmlFor="status">This tool hasn't been released yet</label>
        <input 
          className='form-control'
          type="checkbox" 
          id="status"
          name='status'
          value={!this.props.submit}
          onChange={this.props.handleChange}
        />
      </section>
    )
  }
}

export default Details;