import React from "react";
import Website from './website';
import Details from './details';
import Galery from './galery';
import Hunter from './hunter';

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
    if (name == 'logo' ) {
      
      product[name] = e.target.files[0]
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
    // formData.append('product[screenshots]', screenshots);
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
          Previous
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
          Next
        </button>
      )
    }

    //shouldnt we call handleSubmit?
    return null;
  }

  render() {
    return (
      <main className='product-form'>
        <React.Fragment>
          <h1>Submit a cool tool</h1>

          {/* currentStep {i} should be used to determine the h1 above*/}
          <p>Step {this.state.currentStep}</p>

          <form onSubmit={this.handleSubmit}>

            <Website
              currentStep={this.state.currentStep}
              handleChange={this.handleChange}
              website={this.state.website}
            />

            <Details
              currentStep={this.state.currentStep}
              handleChange={this.handleChange}
              title={this.state.title}
              tagline={this.state.tagline}
              logo={this.state.logo}
              status={this.state.status}
            />

            <Galery
              currentStep={this.state.currentStep}
              handleChange={this.handleChange}
              screenshots={this.state.screenshots}
              youtube={this.state.youtube}
              description={this.state.description}
            />

            <Hunter
              currentStep={this.state.currentStep}
              handleChange={this.handleChange}
              twitter={this.state.twitter}
              review={this.state.review}
            />

            {this.prevButton}
            {this.nextButton}
          </form>
        </React.Fragment>

      </main>
    )
  }
}

export default ProductForm;