import React from "react";

class DescriptionInput extends React.Component {
  render() {
    return (
      <textarea
        className='form-control'
        id='description'
        type='text'
        name='description'
        placeholder='Description of the tool'
        value={this.props.description}
        onChange={this.props.handleChange}
        required
      ></textarea>
    )
  }
}

export default DescriptionInput;