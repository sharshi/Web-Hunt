import React from "react";

class Galery extends React.Component {
  render() {
    if (this.props.currentStep !== 3) {
      return null;
    }

    // loop over screenshots
    let previewImage = new Array(this.props.screenshots.length);
    debugger
    const previewImages = previewImage.map((_,idx) => {
      return <img src={URL.createObjectURL(this.props.screenshots[idx])} />
    });

    return (
      <section className="form-group">
        <section className="screenshots-section">
          <label htmlFor="screenshots">Screenshots</label>
          <input
            className='form-control screenshots'
            type="file"
            id="screenshots"
            multiple
            name='screenshots'
            files={this.props.screenshots}
            onChange={this.props.handleChange}
            accept="image/gif, image/jpeg, image/png"
            required
          />
          {previewImages}
        </section>
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