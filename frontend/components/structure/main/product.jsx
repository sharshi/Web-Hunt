import React from 'react';

class Product extends React.Component {
  componentWillUnmount() {
    window.location.hash = "#/";
  }

  render() {
    
    const {id, title, tagline} = this.props.product;

    return (
      <>
        <section className='product'>
          {id} {title} 
          {tagline}
        </section>
      </>
    )
  }
}
  
export default Product
