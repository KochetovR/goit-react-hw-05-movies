import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import * as moviesApi from '../../servise/movies-api';

const HomePage = () => {
  const location = useLocation();
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
              <Link
                to={{
                  pathname: `movies/${film.id}`,
                  state: { from: location },
                }}
              >
                {film.original_title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default HomePage;
// :movieId
