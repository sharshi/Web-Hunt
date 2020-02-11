import React from "react";

class Search extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      query: ''
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({
      query: e.target.value
    })
  }

  handleSubmit(e) {
    e.preventDefault();

  }

  render() {
    return (
      <section className="searchField">
        <form onSubmit={this.handleSubmit}>
          <input onChange={this.handleChange} type="text" placeholder='Discover your next favorite tool...' />
        </form>
      </section>
    )
  }
}

export default Search;