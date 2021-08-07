import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as moviesApi from '../../servise/movies-api';

const HomePage = () => {
  const [films, setFilms] = useState(null);

  useEffect(() => {
    moviesApi
      .fetchPopularFilmsToday()
      .then(newFilms => setFilms(newFilms.results));
  }, []);

  return (
    <>
      <h1>Trending today</h1>
      {films && (
        <ul>
          {films.map(film => (
            <li key={film.id}>
              <Link to={`movies/${film.id}`}>{film.original_title}</Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default HomePage;
// :movieId
