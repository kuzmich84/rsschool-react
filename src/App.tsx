import React from 'react';
import './App.css';
import Header from './components/Header';
import Search from './components/Search';
import MovieList from './components/MovieList';

const API_KEY = '61ba9e64';
class App extends React.Component {
  state = {
    movies: [],
    localSearch: localStorage.getItem('search') || 'movie',
  };

  async componentDidMount(): Promise<void> {
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

  searchMovies = async (search: string) => {
    try {
      const response = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${search}&page=1`);
      const data = await response.json();
      this.setState({ movies: data.Search });
    } catch (err) {
      console.error(err);
    }
  };

  render() {
    return (
      <div className="container">
        <Header />
        <Search searchMovies={this.searchMovies} />
        <MovieList movies={this.state.movies} />
      </div>
    );
  }
}
export default App;
