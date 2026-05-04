import React from 'react';

export interface MovieProps {
  imdbID: string;
  Title: string;
  Year: string;
  Type?: string;
  Poster: string;
}
class Movie extends React.Component<MovieProps> {
  constructor(props: MovieProps) {
    super(props);
  }
  render() {
    const { Title: title, Poster: poster, imdbID: id, Year: year } = this.props;
    return (
      <li className="movie-card" key={id}>
        <div className="movie-image">
          <img src={poster} alt={title} />
        </div>

        <div className="movie-info">
          <p className="movie-title">{title}</p>
          <p className="movie-year">{year}</p>
        </div>
      </li>
    );
  }
}

export default Movie;
