import React from 'react';
import Form from './common/form';
import Joi from 'joi-browser';
import { getMovie, saveMovie } from '../services/fakeMovieService';
import { getGenres } from '../services/fakeGenreService';

class MovieForm extends Form {
  state = {
    data: { title: '', genreId: '', numberInStock: '', dailyRentalRate: '' },
    genres: [],
    errors: {},
  };

  schema = {
    _id: Joi.string(),
    title: Joi.string().required().label('Title'),
    genreId: Joi.string().required().label('Genre'),
    numberInStock: Joi.number()
      .min(0)
      .max(100)
      .required()
      .label('Number In Stock'),
    dailyRentalRate: Joi.number()
      .min(0)
      .max(10)
      .required()
      .label('Daily Rental Rate'),
  };

  componentDidMount() {
    const genres = getGenres();
    this.setState({ genres });

    const movieId = this.props.match.params.id;
    if (movieId === 'new') return;

    const movie = getMovie(movieId);
    if (!movie) return this.props.history.replace('/not-found');

    this.setState({ data: this.mapToViewModel(movie) });
  }

  doSubmit = () => {
    saveMovie(this.state.data);

    this.props.history.push('/movies');
  };

  mapToViewModel(movie) {
    return {
      _id: movie._id,
      title: movie.title,
      genreId: movie.genre._id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate,
    };
  }

  render() {
    return (
      <div>
        <h1>Movie Form</h1>
        {this.renderInput('title', 'Title')}
        {this.renderSelect('genreId', 'Genre', this.state.genres)}
        {this.renderInput('numberInStock', 'Number In Stock')}
        {this.renderInput('dailyRentalRate', 'Rate')}
        {this.renderButton('Save')}
      </div>
    );
  }
}

export default MovieForm;
