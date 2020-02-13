import React from "react";
import FeedListItem from "./feed_list_items";

class FeedList extends React.Component {
  componentDidMount() {
    this.props.fetchPopularProducts();
  }

  render() {
    if (this.props.products.length === 2) return null

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