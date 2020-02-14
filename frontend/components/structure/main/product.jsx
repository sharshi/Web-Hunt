import React from 'react';

class Product extends React.Component {
  componentWillUnmount() {
    window.location.hash = "#/";
    const body = document.getElementsByTagName('body')[0]
    body.classList.remove('no-scroll')
  }

  componentDidMount() {
    const body = document.getElementsByTagName('body')[0]
    body.classList.add('no-scroll')
  }

  render() {
    debugger
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
