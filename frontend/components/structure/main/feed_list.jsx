import React from "react";
import FeedListItem from "./feed_list_items";

class FeedList extends React.Component {
  componentDidMount() {
    setTimeout( () => 
      this.props.fetchPopularProducts(), 
    1000);
  }

  render() {
    const placeholders = [...new Array(8)].map((undef,i) => {
      return (
        <li key={`placeholder-${i}`} className="feed-list-item">
          <a className='feed-list-item-container'>
            <img src="" className='placeholder' alt="" />
            <section>
              <h3 className="title-placeholder pulse-width"></h3>
              <p className="tagline-placeholder pulse-width"></p>
            </section>
          </a>
        </li>
      )
    })
    if (this.props.products.length === 2) return (
      <ul className="feed-list">
        <section>
          {placeholders}
        </section>
      </ul>
    )

    const feedListItems = this.props.products.map(product => {
      const { title, id} = product;
      if (!title) return null;
      return <FeedListItem key={`${id}-${title}`} openModal={() => this.props.openModal} product={product} />
    })

    return (
      <ul className="feed-list">
        {feedListItems}
      </ul>
    )
  }
}

export default FeedList;