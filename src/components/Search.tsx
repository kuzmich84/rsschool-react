import React, { type ChangeEvent } from 'react';

interface SearchState {
  search: string;
}

interface SearchProps {
  searchMovies: (search: string, page: number) => void;
  setPage: (page: number, isLoadMore: boolean) => void;
}
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
      const current = this.state.search.trim();
      const saved = localStorage.getItem('search') || '';

      if (current === saved) {
        return;
      }

      const value = current || 'movie';

      localStorage.setItem('search', value);
      this.props.searchMovies(value, 1);
      this.props.setPage(1, false);
      this.setState({ search: this.state.search.trim() });
    } else {
      this.props.searchMovies('movie', 1);
      this.props.setPage(1, true);
      localStorage.removeItem('search');
    }
  };

  render() {
    return (
      <div className="search-content">
        <input
          type="text"
          placeholder="Try to search a movie..."
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
