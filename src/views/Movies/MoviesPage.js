import { useState, useEffect } from 'react';
import { Link, useRouteMatch, useLocation, useHistory } from 'react-router-dom';
import * as moviesApi from '../../servise/movies-api';
import { toast } from 'react-toastify';

const Movies = () => {
  const { url } = useRouteMatch();
  const [request, setRequest] = useState('');
  const [movies, setMovies] = useState(null);

  const handleInputChange = e => {
    const value = e.currentTarget.value;

    setRequest(value);
  };

  const history = useHistory();
  const location = useLocation();

  const queryValue = new URLSearchParams(location.search).get('query') ?? '';

  useEffect(() => {
    if (queryValue.length > 0) {
      moviesApi
        .fetchSearchFilm(queryValue)
        .then(films => setMovies(films.results));
    }
    return;
  }, [queryValue]);

  const handleSubmit = e => {
    e.preventDefault();

    if (request.trim() === '') {
      toast.error('Enter a valid search');
      return;
    }

    moviesApi.fetchSearchFilm(request).then(films => setMovies(films.results));
    history.push({ ...location, search: `query=${request}` });
    reset();
  };

  const reset = () => {
    setRequest('');
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          value={request}
          onChange={handleInputChange}
          //   className={styles.SearchForm__input}
          type="text"
        />
        <button type="submit">Search</button>
      </form>

      {movies && (
        <ul>
          {movies.map(movie => (
            <li key={movie.id}>
              <Link to={`${url}/${movie.id}`}>{movie.original_title}</Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default Movies;
