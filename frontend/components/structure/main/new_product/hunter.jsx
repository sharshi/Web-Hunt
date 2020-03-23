import React from "react";

class Hunter extends React.Component {
  render() {
    if (this.props.currentStep !== 4) {
      return null;
    }

    // What made you like this tool?
    return (
      <section className="form-group">
        <label htmlFor="twitter">Tool's Twitter account</label>
        <input
          className='form-control'
          id='twitter'
          type='text'
          name='twitter'
          placeholder='@product_name'
          value={this.props.twitter}
          onChange={this.props.handleChange}
        />
        {/* <label htmlFor="review">Write the first review</label>
        <textarea
          className='form-control'
          id='review'
          type='text'
          name='review'
          placeholder='Explain what makes this tool so helpful during software development.'
          value={this.props.review}
          onChange={this.props.handleChange}
        ></textarea> */}
      </section>
    )
  }
}

export default Hunter;