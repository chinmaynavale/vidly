import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import MoviesTable from './moviesTable';
import ListGroup from './common/listGroup';
import Pagination from './common/pagination';
import SearchBox from './common/searchBox';
import paginate from '../utils/paginate';
import { getMovies } from '../services/fakeMovieService';
import { getGenres } from '../services/fakeGenreService';
import _ from 'lodash';

class Movies extends Component {
  state = {
    movies: [],
    genre: [],
    currentPage: 1,
    pageSize: 4,
    searchQuery: '',
    selectedGenre: null,
    sortColumn: { path: 'title', order: 'asc' },
  };

  componentDidMount() {
    const genre = [{ _id: '', name: 'All Genre' }, ...getGenres()];
    this.setState({ movies: getMovies(), genre });
  }

  handleLike = movie => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  handleDelete = movie => {
    const movies = this.state.movies.filter(m => m._id !== movie._id);
    this.setState({ movies });
  };

  handleGenreSelect = genre => {
    this.setState({ selectedGenre: genre, searchQuery: '', currentPage: 1 });
  };

  handleSearch = query => {
    this.setState({ searchQuery: query, selectedGenre: null, currentPage: 1 });
  };

  handlePageChange = page => {
    if (this.state.currentPage === page) return null;
    this.setState({ currentPage: page });
  };

  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };

  getPagedData = () => {
    const {
      pageSize,
      currentPage,
      movies: allMovies,
      selectedGenre,
      searchQuery,
      sortColumn,
    } = this.state;

    let filteredMovies = allMovies;

    if (searchQuery)
      filteredMovies = allMovies.filter(m =>
        m.title.toLowerCase().includes(searchQuery.toLowerCase().trim())
      );
    else if (selectedGenre && selectedGenre._id)
      filteredMovies = allMovies.filter(m => m.genre._id === selectedGenre._id);

    const sorted = _.orderBy(
      filteredMovies,
      [sortColumn.path],
      [sortColumn.order]
    );

    const movies = paginate(sorted, currentPage, pageSize);

    return { totalCount: filteredMovies.length, movies };
  };

  render() {
    const {
      pageSize,
      currentPage,
      movies: allMovies,
      genre,
      selectedGenre,
      sortColumn,
      searchQuery,
    } = this.state;

    if (allMovies.length === 0)
      return <p>There are no movies in the database</p>;

    const { totalCount, movies } = this.getPagedData();

    return (
      <div className='row'>
        <div className='col-3'>
          <ListGroup
            items={genre}
            selectedItem={selectedGenre}
            onItemSelect={this.handleGenreSelect}
          />
        </div>

        <div className='col'>
          <Link to='/movies/new'>
            <button className='btn btn-primary mb-3'>New Movie</button>
          </Link>

          <p>Showing {totalCount} movies in the database.</p>

          <SearchBox value={searchQuery} onChange={this.handleSearch} />

          <MoviesTable
            movies={movies}
            sortColumn={sortColumn}
            onLike={this.handleLike}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
          />

          <Pagination
            itemsCount={totalCount}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}

export default Movies;
