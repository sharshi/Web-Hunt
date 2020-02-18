import React from "react";
import DescriptionInput from "./description_input";

class Gallery extends React.Component {
  render() {
    if (this.props.currentStep !== 3) {
      return null;
    }

    // let previewImage = new Array(this.props.screenshots.length);
    // let previewImages;
    // if (previewImage.length > 0 ) {
    //   previewImages = this.props.screenshots.map((i) => {
    //     const url = URL.createObjectURL(i[0]);
    //     return <img key={url} src={url} />
    //   });
    // } else {
    //   previewImages = []
    // }

    let previewImages;
    if (this.props.screenshot_preview_urls.length > 0) {
      previewImages = this.props.screenshot_preview_urls.map(url => {
        return <img key={url} src={url} />
      });
    } else {
      previewImages = []
    }

    return (
      <section className="form-group">
        <section className="screenshots-section">
          <label htmlFor="screenshots">Screenshots <span>- at least one required</span></label><br/>
          <input
            className='form-control screenshots'
            type="file"
            id="screenshots"
            name='screenshots'
            files={this.props.screenshots}
            onChange={this.props.handleChange}
            accept="image/gif, image/jpeg, image/png"
            required
          />
          <span className='product-form-gallery-preview' >
            {previewImages.length ? previewImages : null }
          </span>
          
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
        <label htmlFor="description">Description <span>- required</span></label>
        <DescriptionInput
          description={this.props.description}
          handleChange={this.props.handleChange} 
        />
      </section>
    )
  }
}

export default Gallery;