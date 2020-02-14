import React from "react";

class Galery extends React.Component {
  render() {
    if (this.props.currentStep !== 3) {
      return null;
    }

    // Let’s make this tool look nice
    return (
      <section className="form-group">
        {/* <label htmlFor="screenshots">Screenshots</label>
        <input
          className='form-control'
          type="file"
          id="screenshots"
          multiple
          name='screenshots'
          value={this.props.screenshots}
          onChange={this.props.handleChange}
        /> */}
        <label htmlFor="youtube">YouTube video</label>
        <input
          className='form-control'
          id='youtube'
          type='text'
          name='youtube'
          placeholder='Video of the tool'
          value={this.props.youtube}
          onChange={this.props.handleChange}
        />
        <label htmlFor="description">Description</label>
        <textarea
          className='form-control'
          id='description'
          type='text'
          name='description'
          placeholder='Description of the tool'
          value={this.props.description}
          onChange={this.props.handleChange}
        ></textarea>
      </section>
    )
  }
}

export default Galery;