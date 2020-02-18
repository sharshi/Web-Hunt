import React from "react";
import Website from './website';
import Details from './details';
import Gallery from './gallery';
import Hunter from './hunter';
import ProductPreview from "./product_preview";
import {urlProduct} from '../../../../utils/products_api_util';

class ProductForm extends React.Component {
  constructor(props) {
    super(props);
    // should make a container
    this.state = {
      currentStep: 1,
      product: this.props.product,
      screenshot_preview_urls: []
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this._next = this._next.bind(this)
    this._prev = this._prev.bind(this)

  }
  
  handleChange(e) {
    const { name, value } = e.target;

    let product = this.state.product;
    let screenshot_preview_urls = this.state.screenshot_preview_urls;
    if (name === 'youtube') {
      debugger
      let reg = /^.*(youtu.be\/|v\/|e\/|u\/\w+\/|embed\/|v=)([^#\&\?]*).*/i;
      let match = value.match(reg);
      product[name] = match ? match[match.length - 1] : value; 
    } else if ( name === 'logo' ) {
      product[name] = e.target.files[0]
    } else if ( name === 'screenshots' ) {
      product[name] = product[name].concat(e.target.files);
      screenshot_preview_urls = screenshot_preview_urls.concat(URL.createObjectURL(e.target.files[0]))
    } else {
      product[name] = value;
    }
    
    this.setState({
      product,
      screenshot_preview_urls
    });
  }

  componentWillUnmount() {
    this.props.clearErrors()
  }

  handleSubmit(e) {
    e.preventDefault();
    
    const { website, title, tagline, logo, status, topics, screenshots, youtube, description, twitter, review, hunter_id } = this.state.product;

    const formData = new FormData();
    formData.append('product[launch_date]', new Date());
    formData.append('product[hunter_id]', hunter_id);
    formData.append('product[website]', this.cleanUrl(website));
    formData.append('product[title]', title);
    formData.append('product[tagline]', tagline);
    formData.append('product[logo]', logo);
    formData.append('product[status]', status);
    // formData.append('product[topics]', topics);
    for (let i = 0; i < screenshots.length; i++) {
      formData.append("product[screenshots][]", screenshots[i][0]);
    }
    formData.append('product[youtube]', youtube);
    formData.append('product[description]', description);
    formData.append('product[twitter]', twitter);
    // formData.append('product[review]', review);

    this.props.createProduct(formData)
  }

  _next(e) {
    e.preventDefault();
    let currentStep = this.state.currentStep;

    if (currentStep === 1) {
      const url = this.cleanUrl(this.state.product.website);
      urlProduct(this.state.product.website).then(bool => {
          if (!this.isUrl(url)) {
            alert('please enter a valid url')
          } else if (bool) {
            alert('please enter a unique url')
          } else {
            this.setState({
              currentStep: currentStep + 1
            })
          }
        }
      )
    } else {
      // if currentStep more than or equal to 3 return 4, else return currentStep + 1
      currentStep = currentStep >= 3 ? 4 : currentStep + 1;
      this.setState({
        currentStep: currentStep
      })
    }
  }

  cleanUrl(url) {
    url = url.replace(/^(?:https?:\/\/)?(?:www\.)?/i, "");
    return url;
  }

  isUrl(url) {
    // https://stackoverflow.com/a/3809435/2140793
    var expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);

    return !!url.match(regex)
  }

  _prev(e) {
    e.preventDefault();
    let currentStep = this.state.currentStep;
    // if currentStep less than or equal to 1 return 1, else return currentStep - 1
    currentStep = currentStep <= 1 ? 1 : currentStep - 1;
    this.setState({
      currentStep: currentStep
    })
  }

  get prevButton() {
    let currentStep = this.state.currentStep;
    if (currentStep !== 1) {
      return (
        <button
          className=""
          onClick={this._prev}>
          PREVIOUS
        </button>
      )
    }
    return null;
  }

  get nextButton() {
    let currentStep = this.state.currentStep;
    let clickAction;
    let check;
    const next = this._next;

    const alertWarning = () => {};
    switch (currentStep) {
      case 1:
        
        check = 
          this.state.product.website !== '';
        
        clickAction = check ? next : alertWarning;
        break;
      case 2:
        check = 
          this.state.product.title != '' && 
          this.state.product.tagline != '' && 
          this.state.product.logo != '';

        clickAction = check ? next : alertWarning;
        break;
      case 3:
        check =
          this.state.product.screenshots != '' &&
          this.state.product.description != '';

        clickAction = check != '' ? next : alertWarning;
        break;
      case 4:
        // no check
        clickAction = true ? next : alertWarning;
        break;
      default:
        clickAction = next;
        break;
    }

    if (currentStep < 4) {
      return (
        <button
          className=""
          onClick={clickAction}>
          NEXT
        </button>
      )
    }

    //shouldnt we call handleSubmit?
    return null;
  }
  
  get scheduleNotice() {
    let currentStep = this.state.currentStep;

    if (currentStep === 1) {
      return (
        <section className="schedule-notice">
          <p>
            <strong>Not ready to post today?</strong>
          </p>
          <p>You can schedule your launch. <a>Learn more</a></p>
        </section>
      )
    }

    //shouldnt we call handleSubmit?
    return null;
  }

  render() {
    const title = [
      'Submit a cool tool',
      'Tell us more about this tool',
      'Let’s make this tool look nice',
      'Who made this tool?'
    ][this.state.currentStep - 1]

    const errors = this.props.errors ? (
      this.props.errors.map(error => {
        return (
          <li key={error}>{error}</li>
        )
      })
    ) : (
      []
    );
    return (
      <main className={`section-${this.state.currentStep} product-form`}>
        <React.Fragment>
          
          <section className="input">
            <h1>{title}</h1>
            <form onSubmit={this.handleSubmit}>

              <Website
                currentStep={this.state.currentStep}
                handleChange={this.handleChange}
                website={this.state.product.website}
              />

              <Details
                currentStep={this.state.currentStep}
                handleChange={this.handleChange}
                title={this.state.product.title}
                tagline={this.state.product.tagline}
                logo={this.state.product.logo}
                status={this.state.product.status}
              />

              <Gallery
                currentStep={this.state.currentStep}
                handleChange={this.handleChange}
                screenshots={this.state.product.screenshots}
                youtube={this.state.product.youtube}
                description={this.state.product.description}
                screenshot_preview_urls={this.state.screenshot_preview_urls}
              />

              <Hunter
                currentStep={this.state.currentStep}
                handleChange={this.handleChange}
                twitter={this.state.product.twitter}
                review={this.state.product.review}
              />

              <section className="nav-buttons">
                {this.prevButton}
                {this.nextButton}
              </section>

              {this.scheduleNotice}
            </form>
          </section>

          <ProductPreview
            currentStep={this.state.currentStep}
            product={this.state.product}
            fromPreview={true}
            urlFromPreview={(this.state.product.logo) ? this.state.product.logo :  null   }
          />

          <ul className='errors-list'>{errors}</ul>
        </React.Fragment>

      </main>
    )
  }
}

export default ProductForm;