import React from "react";
import FeedListItem from '../feed_list_items';


class ProductPreview extends React.Component {
  render() {
    const { currentStep } = this.props;
    const preview = (currentStep === 2) ? (
        <section className="product-preview">
          <p className='preview'>PREVIEW</p>
          <FeedListItem 
            product={this.props.product} 
            fromPreview={this.props.fromPreview}
            urlFromPreview={this.props.urlFromPreview}
          />
        </section>
      ) : (currentStep === 3) ? (
        <section className="product-preview">
          'galery'
        </section>
      ) : (currentStep === 4) ? (
        <section className="product-preview">
          'hunter'
        </section>
      ) : null;

    return (
      <>
      {preview}
      </>
    )
  }
}

export default ProductPreview;