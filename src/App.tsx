import React from 'react';
import './App.css';
import Header from './components/Header';
import Search from './components/Search';
import MovieList from './components/MovieList';
import LoadMore from './components/LoadMore';
import Preloader from './components/Preloader';

const API_KEY = '61ba9e64';
const URL_API = 'https://www.omdbapi.com';
class App extends React.Component {
  state = {
    movies: [],
    localSearch: localStorage.getItem('search') || 'movie',
    page: 1,
    isLoadMore: true,
    isLoading: false,
    error: '',
  };

  async componentDidMount(): Promise<void> {
    this.setState({ isLoading: true });
    if (localStorage.getItem('search')) {
      this.setState({ isLoadMore: false });
    }
    try {
      const response = await fetch(`${URL_API}/?apikey=${API_KEY}&s=${this.state.localSearch}`);

      if (!response.ok) {
        const errorData = await response.json();
        this.setState({ error: errorData });
      }
      const data = await response.json();

      if (data.Response === 'False') {
        throw new Error(data.Error);
      }
      this.setState({ movies: data.Search });
      this.setState({ isLoading: false });
    } catch (err: unknown) {
      if (err instanceof Error) {
        this.setState({ error: err.message });
      } else {
        this.setState({ error: 'Something went wrong' });
      }

      this.setState({ isLoading: false });
    }
  }

  searchMovies = async (search: string, page = 1) => {
    this.setState({ isLoading: true });
    try {
      const response = await fetch(`${URL_API}/?apikey=${API_KEY}&s=${search}&page=${page}`);

      if (!response.ok) {
        const errorData = await response.json();
        this.setState({ error: errorData });
        throw new Error('Request failed');
      }
      const data = await response.json();
      if (data.Response === 'False') {
        throw new Error(data.Error);
      }
      this.setState({ movies: data.Search });
      this.setState({ isLoading: false });
    } catch (err: unknown) {
      if (err instanceof Error) {
        this.setState({ error: err.message });
      } else {
        this.setState({ error: 'Something went wrong' });
      }

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
        {this.state.isLoadMore && !this.state.error && (
          <LoadMore loadMore={this.loadMore} page={this.state.page} />
        )}
        {this.state.error && <h2 className="error-message"> Error: {this.state.error}</h2>}
      </div>
    );
  }
}
export default App;
