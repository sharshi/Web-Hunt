import React from "react";
import FeedListItem from '../feed_list_items';


class ProductPreview extends React.Component {
  render() {
    const {
      title,
      tagline,
      website,
      logoUrl,
      upvote_ids,
      review_ids,
      topics
    } = this.props.product;

    let logoUrlPreview;
    if ( this.props.urlFromPreview) {
      logoUrlPreview = URL.createObjectURL(this.props.urlFromPreview);
    } else {
      logoUrlPreview = logoUrl;
    }

    const previewElement = (
      <li className="feed-list-item">
        <a
          className="feed-list-item-container"
        >
          <img src={logoUrlPreview} alt="" />
          <section>
            <h3 className="title">{title}</h3>

            <p className="tagline">{tagline}</p>
          </section>
        </a>

        <section className="links">
          <a className="comments">
            <i className="fas fa-comment"></i>{" "}
            {8}
          </a>
          <a
            className="website-link"
          >
            <i className="fas fa-external-link-alt fa-xs"></i>
          </a>
          <a className="first-topic">
            {/* { "Technology"} */}
          </a>
        </section>
        <span
          className="upvote active"
        >
          ▲
          <br />
          {74}
        </span>
      </li>
    );

    
    const { currentStep } = this.props;
    const preview =
      currentStep === 2 ? (
        <section className="product-preview">
          <p className="preview">PREVIEW</p>
          {previewElement}
        </section>
      ) : currentStep === 3 ? // <section className="product-preview">
      //   gallery
      // </section>
      null : currentStep === 4 ? null : null;

    return (
      <>
      {preview}
      </>
    )
  }
}

export default ProductPreview;