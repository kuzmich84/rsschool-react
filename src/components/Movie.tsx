import React from 'react';

interface MovieProps {
  title: string;
  year: string;
  type?: string;
  poster: string;
}
class Movie extends React.Component<MovieProps> {
  constructor(props: MovieProps) {
    super(props);
  }
  render() {
    return (
      <div className="movie-card">
        <img src={this.props.poster} alt={this.props.title} />
        <div className="movie-info">
          <div className="movie-title">{this.props.title}</div>
          <div className="movie-year">{this.props.year}</div>
        </div>
      </div>
    );
  }
}

export default Movie;
