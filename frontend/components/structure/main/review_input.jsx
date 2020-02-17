import React from 'react';

class ReviewInput extends React.Component {
  handleSubmit(e) {
    e.preventDefault();
  }
  render() {
    return ( 
      <>
        <span className="profile-picture-round"></span>
        <form onSubmit={this.handleSubmit}>
          <input name="" placeholder='enter a review' />
          <button>SEND</button>
        </form>
      </>
     )
  }
}

export default ReviewInput;