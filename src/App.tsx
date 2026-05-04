import React from 'react';
import './App.css';
import Header from './components/Header';
import Search from './components/Search';
import MovieList from './components/MovieList';
import LoadMore from './components/LoadMore';

const API_KEY = '61ba9e64';
class App extends React.Component {
  state = {
    movies: [],
    localSearch: localStorage.getItem('search') || 'movie',
    page: 1,
    isLoadMore: true,
  };

  async componentDidMount(): Promise<void> {
    if (localStorage.getItem('search')) {
      this.setState({ isLoadMore: false });
    }
    try {
      const response = await fetch(
        `https://www.omdbapi.com/?apikey=${API_KEY}&s=${this.state.localSearch}`,
      );
      const data = await response.json();
      this.setState({ movies: data.Search });
    } catch (err) {
      console.error(err);
    }
  }

  searchMovies = async (search: string, page = 1) => {
    try {
      const response = await fetch(
        `https://www.omdbapi.com/?apikey=${API_KEY}&s=${search}&page=${page}`,
      );
      if (response.ok) {
        const data = await response.json();
        this.setState({ movies: data.Search });
      } else {
        console.log(response.json());
      }
    } catch (err) {
      console.error(err);
    }
  };

  loadMore = () => {
    this.setState({ page: this.state.page + 1 }, () => {
      this.searchMovies(this.state.localSearch, this.state.page);
    });
  };

  setPage = (page: number, isLoadMore: boolean) => {
    this.setState({ page: page });
    this.setState({ isLoadMore: isLoadMore });
  };

  render() {
    return (
      <div className="container">
        <Header />
        <Search searchMovies={this.searchMovies} setPage={this.setPage} />
        <MovieList movies={this.state.movies} />
        {this.state.isLoadMore && <LoadMore loadMore={this.loadMore} page={this.state.page} />}
      </div>
    );
  }
}
export default App;
