import React from "react";

class Website extends React.Component {
  render() {
    if (this.props.currentStep !== 1) {
      return null;
    }

    return (
      <section className="form-group website">
        <label htmlFor="website">Website</label>
        <input 
          className='form-control'
          id='website'
          type='url'
          name='website'
          placeholder='Website of the tool'
          value={this.props.website}
          onChange={this.props.handleChange}
          pattern="https://.*"
          required
        />
      </section>
    )
  }
}

export default Website;