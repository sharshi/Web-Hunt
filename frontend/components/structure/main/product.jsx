import React from 'react';
import GalleryDisplay from './gallery_display';
import ReviewInput from './review_input';

class Product extends React.Component {
  componentWillUnmount() {
    if (this.props.inModal) {
      window.location.hash = "#/";
      const body = document.getElementsByTagName('body')[0]
      body.classList.remove('no-scroll')
    }
  }

  componentDidMount() {
    if (this.props.inModal) {
      const body = document.getElementsByTagName('body')[0]
      body.classList.add('no-scroll')
    }
    const { productId } = this.props;

    window.location.hash = `#/products/${productId}`
    this.props.fetchProduct(productId)
  }

  render() {
    if (!this.props.product) {
      return null; 
    }
    const { id, title, tagline, website, logoUrl, launch_date, description, status, hunter_id, topics, screenshotUrls, reviews, youtube } = this.props.product;

    return (
      <>
        <section className='product-main'>
          <header>
            <section className='main-info'>
              <img src={logoUrl} alt="" />
              <section className='title-tagline'>
                <h3 className='title' >{title}</h3>

                <p className='tagline'>{tagline}</p>

                <ul>
                  <li>TAG 1</li>
                  <li>TAG 2</li>
                </ul>
              </section>
            </section>
          </header>
          <main>
            <section className="main-image">
              <section className="gallery">
                <GalleryDisplay youtube={youtube} screenshots={screenshotUrls} />
              </section>
              <p className='description'>
                {description}
              </p>
            </section>

            {/* itterate through all reviews  */}
            <section className="discussion">
              <section className="review-input">
                <ReviewInput />
              </section>
              <span className='reviews'>
                <ul>
                  <li>Review 1</li>
                  <li>Review 2</li>
                </ul>
              </span>
            </section>
          </main>
          <aside className='product'>
            <div className='upvote-section'>
              <span className="upvote-button">▲ UPVOTE <div>123</div></span>
              <div className='product-upvoters'>
                <span className='upvoter-picture'>
                </span>
                <span className='upvoter-picture'>
                </span>
                <span className='upvoter-picture'>
                </span>
              </div>
            </div>

            <hr/>
            
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
