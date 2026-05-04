import React from 'react';
import './App.css';
import Header from './components/Header';
import Search from './components/Search';
import MovieList from './components/MovieList';
import LoadMore from './components/LoadMore';
import Preloader from './components/Preloader';

const API_KEY = '61ba9e64';
class App extends React.Component {
  state = {
    movies: [],
    localSearch: localStorage.getItem('search') || 'movie',
    page: 1,
    isLoadMore: true,
    isLoading: false,
  };

  async componentDidMount(): Promise<void> {
    this.setState({ isLoading: true });
    if (localStorage.getItem('search')) {
      this.setState({ isLoadMore: false });
    }
    try {
      const response = await fetch(
        `https://www.omdbapi.com/?apikey=${API_KEY}&s=${this.state.localSearch}`,
      );
      const data = await response.json();
      this.setState({ movies: data.Search });
      this.setState({ isLoading: false });
    } catch (err) {
      console.error(err);
      this.setState({ isLoading: false });
    }
  }

  searchMovies = async (search: string, page = 1) => {
    this.setState({ isLoading: true });
    try {
      const response = await fetch(
        `https://www.omdbapi.com/?apikey=${API_KEY}&s=${search}&page=${page}`,
      );
      const data = await response.json();
      this.setState({ movies: data.Search });
      this.setState({ isLoading: false });
    } catch (err) {
      console.error(err);
      this.setState({ isLoading: false });
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
        {this.state.isLoading ? <Preloader /> : <MovieList movies={this.state.movies} />}
        {this.state.isLoadMore && <LoadMore loadMore={this.loadMore} page={this.state.page} />}
      </div>
    );
  }
}
export default App;
