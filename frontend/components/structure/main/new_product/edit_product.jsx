import React from "react";
import DescriptionInput from "./description_input";

class EditProduct extends React.Component {
  constructor(props) {
    super(props);
    const { product } = this.props;
    this.state = {
      product,
      screenshot_preview_urls: []
    }
  }
  render() {




    const previewImage = (logo) ? (
      <img src={URL.createObjectURL(logo)} />
    ) : (
      <img />
    );  

    let previewImages;
    if (screenshot_preview_urls.length > 0) {
      previewImages = screenshot_preview_urls.map(url => {
        return <img key={url} src={url} />
      });
    } else {
      previewImages = []
    }


    return (
      <form>
        <label htmlFor="website">Website <span>- required</span></label>
        <input
          className='form-control'
          id='website'
          type='url'
          name='website'
          placeholder='Website of the tool'
          value={website}
          onChange={this.handleChange}
          pattern="https://.*"
          required
        />
        <label htmlFor="title">Name of the tool <span>- required</span></label>
        <input
          className='form-control'
          id='title'
          type='text'
          name='title'
          placeholder='Name of the tool'
          value={title}
          onChange={this.handleChange}
          required
        />
        <label htmlFor="tagline">Tagline <span>- required</span></label>
        <input
          className='form-control'
          id='tagline'
          type='text'
          name='tagline'
          placeholder='Short catchy tagline for the tool'
          value={tagline}
          onChange={this.handleChange}
          required
        />
        <label htmlFor="topics">Topics <span></span></label>
        <input
          className='form-control'
          id='topics'
          type='text'
          name='topics'
          placeholder='Add a topic'
          value={topic}
          onChange={this.handleChange}
        />
        <section className="logo-section">
          <label htmlFor="logo">Logo Upload <span>- required</span></label>
          <input
            className='form-control logo'
            type="file"
            id="logo"
            name='logo'
            accept="image/gif, image/jpeg, image/png"
            files={logo}
            onChange={this.handleChange}
            required
          />
          {previewImage}
          <p>Recommended size: 240x240 <br />
            JPG, PNG, GIF. Max size: 2MB</p>
        </section>
        <label htmlFor="status">Status</label>
        {/* make a dropdown */}
        <input
          className='form-control'
          type="checkbox"
          id="status"
          name='status'
          value={!submit}
          onChange={this.handleChange}
        /><p className='status'>Pre-launch</p>
        <section className="screenshots-section">
          <label htmlFor="screenshots">Screenshots <span>- at least one required</span></label><br />
          <input
            className='form-control screenshots'
            type="file"
            id="screenshots"
            name='screenshots'
            files={screenshots}
            onChange={this.handleChange}
            accept="image/gif, image/jpeg, image/png"
            required
          />
          <span className='product-form-gallery-preview' >
            {previewImages.length ? previewImages : null}
          </span>

        </section>

        <label htmlFor="description">Description <span>- required</span></label>
        <DescriptionInput
          description={description}
          handleChange={this.handleChange}
        />
      </form>
    )
  }
}

export default EditProduct;