import React, { type ChangeEvent } from 'react';

interface SearchState {
  search: string;
}

type SearchProps = {
  searchMovies: (search: string) => void;
};
class Search extends React.Component<SearchProps, SearchState> {
  constructor(props: SearchProps) {
    super(props);
  }
  state = {
    search: localStorage.getItem('search') || '',
  };

  handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({ search: event.target.value });
  };

  handleClick = () => {
    if (this.state.search) {
      localStorage.setItem('search', this.state.search);
      this.props.searchMovies(this.state.search);
    } else {
      this.props.searchMovies('movie');
    }
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
