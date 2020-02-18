import React from 'react';
import GalleryDisplay from './gallery_display';
import ReviewInput from './review_input';
import { Link } from 'react-router-dom';

class Product extends React.Component {
  componentWillUnmount() {
    if (this.props.inModal && !window.location.hash.includes('@')) {
      window.location.hash = "#/";
      const body = document.getElementsByTagName('body')[0]
      body.classList.remove('no-scroll')
    }
  }

  componentDidMount() {
    const { productId } = this.props;

    if (this.props.inModal) {
      const body = document.getElementsByTagName('body')[0]
      body.classList.add('no-scroll')
      window.location.hash = `#/products/${productId}?from-feed`
    }

    this.props.fetchProduct(productId)
  }

  render() {

    if (!this.props.product) {
      return null;
    }
    const { id, title, tagline, website, logoUrl, launch_date, description, status, hunter_id, topics, screenshotUrls, reviews, youtube, hunter } = this.props.product;
debugger
    if (!screenshotUrls) {
      return null; 
    }

    return (
      <>
        <section className='product-main'>
          <header>
            <section className='main-info'>
              <img src={logoUrl} alt="" />
              <section className='title-tagline'>
                <a href={website} target="_blank">
                  <h3 className='title' >{title}</h3>
                  <i className="fas fa-external-link-alt"></i>
                </a>
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
                <span>DESCRIPTION</span>
                {description}
              </p>
            </section>

            {/* itterate through all reviews  */}
            <h4>REVIEWS</h4>
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
                <span className='ppr upvoter-picture'>
                </span>
                <span className='ppr upvoter-picture'>
                </span>
                <span className='ppr upvoter-picture'>
                </span>
              </div>
            </div>

            <hr />

            <section className="website-link">
              <h4>Website</h4>
              <a href={website} target="_blank">{website}</a>
            </section>

            <hr />

            <section className="hunter-link">
              <h4>Hunter</h4>
              <span className="profile-picture-round"></span>
              <Link to={`/@${hunter.username}`}>@{hunter.username}</Link>
            </section>
          </aside>
        </section>
      </>
    )
  }
}
  
export default Product
