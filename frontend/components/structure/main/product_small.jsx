import React from 'react';
import { MessageCircle } from 'lucide-react';
import { connect } from 'react-redux';
import { fetchProduct } from "../../../actions/products_actions";
import { Link } from 'react-router-dom';

class ProductSmall extends React.Component {
  componentDidMount() {
    // if product is undefined fetch user
    const { product } = this.props;

    if (!product) {
      this.props.fetchProduct(this.props.id)
    }
  }

  render() {
    // if product is undefined return null
    const { product} = this.props;
    if (!product) return null;
    const { id, title, logoUrl, upvote_ids, review_ids } = product;
    return (
      <Link className="small-product-link" to={`/products/${id}`}>
        <article className='small-product'>
          
          <p>{title}</p>
          <img className='ppjr' src={logoUrl} />
          <span>▲ {upvote_ids.length}</span>
          <span><MessageCircle size={14} /> {review_ids.length}</span>
        </article>
      </Link>
    )
  }
}

const mstp = (state, op) => ({
  product: state.entities.products[op.id]
})

const mdtp = dispatch => ({
  fetchProduct: id => dispatch(fetchProduct(id))
})

export default connect(
  mstp,
  mdtp
)(ProductSmall);