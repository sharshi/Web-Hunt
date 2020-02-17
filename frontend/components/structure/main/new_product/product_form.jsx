import React from "react";
import Website from './website';
import Details from './details';
import Gallery from './gallery';
import Hunter from './hunter';
import ProductPreview from "./product_preview";

class ProductForm extends React.Component {
  constructor(props) {
    super(props);
    // should make a container
    this.state = {
      currentStep: 1,
      product: this.props.product
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this._next = this._next.bind(this)
    this._prev = this._prev.bind(this)

  }
  
  handleChange(e) {
    const { name, value } = e.target;
    
    let product = this.state.product;

    if ( name == 'logo' ) {
      product[name] = e.target.files[0]
    } else if ( name == 'screenshots' ) {
      product[name] = product[name] || [];
      product[name].concat(e.target.files);
    } else {
      product[name] = value;
    }
    
    this.setState({
      product
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    
    const { website, title, tagline, logo, status, topics, screenshots, youtube, description, twitter, review, hunter_id } = this.state.product;

    const formData = new FormData();
    formData.append('product[launch_date]', new Date());
    formData.append('product[hunter_id]', hunter_id);
    formData.append('product[website]', website);
    formData.append('product[title]', title);
    formData.append('product[tagline]', tagline);
    formData.append('product[logo]', logo);
    formData.append('product[status]', status);
    // formData.append('product[topics]', topics);
    for (let i = 0; i < screenshots.length; i++) {
      formData.append("product[screenshots][]", screenshots[i]);
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
    // if currentStep more than or equal to 3 return 4, else return currentStep + 1
    currentStep = currentStep >= 3 ? 4 : currentStep + 1;
    this.setState({
      currentStep: currentStep
    })
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

    if (currentStep < 4) {
      return (
        <button
          className=""
          onClick={this._next}>
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
 
        </React.Fragment>

      </main>
    )
  }
}

export default ProductForm;