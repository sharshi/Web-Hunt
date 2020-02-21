import React from "react";
import DescriptionInput from "./description_input";

class EditProduct extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.props.product;
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.props.fetchProduct(this.props.match.params.id)
      .then(res => {
        this.setState({ ...res.product})
      })
  }

  handleChange(e) {
    const { name, value } = e.target;
    let product = this.state
    let { screenshotUrls } = product;
    
    if (name === 'logo') {
      product[name] = e.target.files[0];
      product['logoUrl'] = URL.createObjectURL(e.target.files[0]);
    } else if (name === 'screenshots') {
      product[name] = product[name] ? [...e.target.files] : [...e.target.files]
      screenshotUrls = screenshotUrls.concat(URL.createObjectURL(e.target.files[0]));
      product['screenshotUrls'] = screenshotUrls;
    } else {
      product[name] = value;
    }

    this.setState({
      product
    });
  }


  handleSubmit(e) {
    e.preventDefault();

    const { id, website, title, tagline, logo, status, topics, screenshots, youtube, description, twitter, review } = this.state;

    const formData = new FormData();

    website ? 
      formData.append('product[website]', this.cleanUrl(website)) 
        : null;
    title ? 
      formData.append('product[title]', title) 
        : null;
    tagline ?
      formData.append('product[tagline]', tagline)
        : null;
    logo ?
      formData.append('product[logo]', logo)
        : null
    formData.append('product[status]', status);
    // formData.append('product[topics]', topics);
    screenshots ? 
      screenshots.forEach(screenshot => {
        formData.append("product[screenshots][]", screenshot[0])
      }) : (null)
    
    formData.append('product[description]', description);
    // formData.append('product[review]', review);

    formData.append('id', id);
    this.props.updateProduct(formData)
      .then(({ product }) => {
        this.props.history.push(`/products/${id}`)
      })
  }




  cleanUrl(url) {
    url = url.replace(/^(?:https?:\/\/)?(?:www\.)?/i, "");
    return url;
  }

  render() {


    if (!this.state) {
      return null
    }
    if (!this.state.screenshotUrls) {
      return null
    }

    // this.state.product should be valid
    const { website, title, tagline, topics, logoUrl, screenshotUrls, status, description } = this.state;

    const previewImage = (logoUrl) ? (
      <img src={logoUrl} />
    ) : (
      <img />
    );  

    let previewImages;
    if (screenshotUrls.length > 0) {
      previewImages = screenshotUrls.map(url => {
        return <img key={url} src={url} />
      });
    } else {
      previewImages = []
    }


    return (
      <section className="product-edit">
        <h1>Edit {title}</h1>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <label htmlFor="website">Website</label>
          <input
            className='form-control'
            id='website'
            type='url'
            name='website'
            placeholder='Website of the tool'
            value={`https://${this.cleanUrl(website)}`}
            onChange={this.handleChange}
            pattern="https://.*"
            
          />
          <label htmlFor="title">Name of the tool</label>
          <input
            className='form-control'
            id='title'
            type='text'
            name='title'
            placeholder='Name of the tool'
            value={title}
            onChange={this.handleChange}
            
          />
          <label htmlFor="tagline">Tagline</label>
          <input
            className='form-control'
            id='tagline'
            type='text'
            name='tagline'
            placeholder='Short catchy tagline for the tool'
            value={tagline}
            onChange={this.handleChange}
            
          />
          <label htmlFor="topics">Topics <span></span></label>
          <input
            className='form-control'
            id='topics'
            type='text'
            name='topics'
            placeholder='Add a topic'
            value={topics}
            onChange={this.handleChange}
          />
          <section className="logo-section">
            <label htmlFor="logo">Logo Upload</label>
            <input
              className='form-control logo'
              type="file"
              id="logo"
              name='logo'
              accept="image/gif, image/jpeg, image/png"
              onChange={this.handleChange}
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
            value={!status}
            onChange={this.handleChange}
          /><p className='status'>Pre-launch</p>
          <section className="screenshots-section">
            <label htmlFor="screenshots">Screenshots</label><br />
            <input
              className='form-control screenshots'
              type="file"
              id="screenshots"
              name='screenshots'
              onChange={this.handleChange}
              accept="image/gif, image/jpeg, image/png"
              
            />
            <span className='product-form-gallery-preview' >
              {previewImages.length ? previewImages : null}
            </span>

          </section>

          <label htmlFor="description">Description</label>
          <DescriptionInput
            description={description}
            handleChange={this.handleChange}
          />

          <button>Update</button>
        </form>
      </section>
    )
  }
}

export default EditProduct;