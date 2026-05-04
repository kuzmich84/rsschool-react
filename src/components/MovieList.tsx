import React from 'react';
import Movie, { type MovieProps } from './Movie';

export interface MovieListProps {
  movies: MovieProps[];
}

class MovieList extends React.Component<MovieListProps> {
  constructor(props: MovieListProps) {
    super(props);
  }

  render() {
    const { movies = [] } = this.props;
    return (
      <ul className="movie-list">
        {movies.length ? (
          movies.map((movie) => <Movie {...movie} key={movie.imdbID} />)
        ) : (
          <h2>Nothing Found</h2>
        )}
      </ul>
    );
  }
}

export default MovieList;
