import React from "react";
import FeedListItem from "./feed_list_items";

class FeedList extends React.Component {
  componentDidMount() {
    setTimeout( () => 
      this.props.fetchPopularProducts(), 
    1000);
  }

  render() {
    const placeholders = [...new Array(8)].map(i => {
      return (
        <li className="feed-list-item">
          <section>
            <img src="" className='placeholder' alt="" />
            <section>
              <a className="title-placeholder pulse-width"></a>
              <p className="tagline-placeholder pulse-width"></p>
            </section>
          </section>
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
      return <FeedListItem key={`${id}-${title}`} product={product} />
    })

    return (
      <ul className="feed-list">
        {feedListItems}
      </ul>
    )
  }
}

export default FeedList;