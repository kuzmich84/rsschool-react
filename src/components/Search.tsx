import React, { type ChangeEvent } from 'react';

class Search extends React.Component {
  state = {
    search: localStorage.getItem('search') || '',
  };

  handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({ search: event.target.value });
  };

  handleClick = () => {
    localStorage.setItem('search', this.state.search);
  };

  render() {
    return (
      <div className="search-content">
        <input
          type="text"
          placeholder="search"
          value={this.state.search}
          onChange={this.handleChange}
        />
        <button className="search-button" onClick={this.handleClick}>
          Search
        </button>
      </div>
    );
  }
}

export default Search;
