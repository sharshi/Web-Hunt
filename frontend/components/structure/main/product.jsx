import React from 'react';

class Product extends React.Component {
  componentWillUnmount() {
    window.location.hash = "#/";
    const body = document.getElementsByTagName('body')[0]
    body.classList.remove('no-scroll')
  }

  componentDidMount() {
    if (this.props.inModal) {
      const body = document.getElementsByTagName('body')[0]
      body.classList.add('no-scroll')
    }
    this.props.fetchProduct(this.props.productId)
  }

  render() {
    if (!this.props.product) {
      return null; 
    }
    const { id, title, tagline, website, logoUrl, launch_date, description, status, hunter_id } = this.props.product;
    
    return (
      <>
        <section className='product'>
          <header>
            <section className='main-info'>
              <img src={logoUrl} alt="" />
              <section className='title-tagline'>
                <h3 className='title' >{title}</h3>

                <p className='tagline'>{tagline}</p>
              </section>
            </section>
          </header>
          <main>
            <section className="main-image">
              <p className='description'>
                {description}
              </p>
            </section>
          </main>
          <aside>
            <section className="website-link">
              <h4>Website</h4>
              <a href={website}>{website}</a>
            </section>
          </aside>
        </section>
      </>
    )
  }
}
  
export default Product
