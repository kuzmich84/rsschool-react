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
    return (
      <ul className="movie-list">
        {this.props.movies.map((movie) => (
          <Movie {...movie} key={movie.imdbID} />
        ))}
      </ul>
    );
  }
}

export default MovieList;
