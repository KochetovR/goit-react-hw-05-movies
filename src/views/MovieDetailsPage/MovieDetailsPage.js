import { lazy, Suspense } from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import {
  NavLink,
  Route,
  useRouteMatch,
  useHistory,
  useLocation,
} from 'react-router-dom';
import * as moviesApi from '../../servise/movies-api';
import { BiArrowBack } from 'react-icons/bi';

import styles from './MovieDetailsPage.module.css';

const Cast = lazy(() =>
  import('../Cast/Cast.js' /* webpackChunkName: "Cast" */),
);
const Reviews = lazy(() =>
  import('../Reviews/Reviews.js' /* webpackChunkName: "Reviews" */),
);

export default function MovieDetailsPage() {
  const { url } = useRouteMatch();
  const { movieId } = useParams();
  const [movie, setMovie] = useState({
    poster_path: null,
    original_title: null,
    overview: null,
    genres: null,
    vote_average: null,
    release_date: null,
  });

  const history = useHistory();
  const location = useLocation();
  const historyParam = location.state ? location.state.from : '/';

  useEffect(() => {
    moviesApi
      .fetchFilmId(movieId)
      .then(
        ({
          poster_path,
          original_title,
          overview,
          genres,
          vote_average,
          id,
          release_date,
        }) =>
          setMovie({
            poster_path: `https://image.tmdb.org/t/p/w500/${poster_path}`,
            original_title,
            overview,
            genres: genres[0].name,
            vote_average,
            release_date: release_date.slice(0, 4),
          }),
      );
  }, [movieId]);

  const onClickGoBack = () => {
    history.push(historyParam);
  };

  const {
    poster_path,
    original_title,
    overview,
    genres,
    vote_average,
    release_date,
  } = movie;
  return (
    <>
      {movie && (
        <>
          <button
            type="button"
            className={styles.button}
            onClick={onClickGoBack}
          >
            <BiArrowBack className={styles.icon} />
            Go back
          </button>
          <div className={styles.mainInfo}>
            <img src={poster_path} alt={original_title} width="200" />
            <div className={styles.info}>
              <h1>
                {original_title}({release_date})
              </h1>
              <p>User Score: {vote_average * 10}%</p>
              <p className={styles.title}>Overview</p>
              <span>{overview}</span>
              <p className={styles.title}>Genres</p>
              {genres && <span>{genres}</span>}
            </div>
          </div>
          <hr></hr>
          <p>Additional information</p>
          <ul>
            <li>
              <NavLink
                to={{ pathname: `${url}/cast`, state: { from: historyParam } }}
              >
                Cast
              </NavLink>
            </li>
            <li>
              <NavLink
                to={{
                  pathname: `${url}/reviews`,
                  state: { from: historyParam },
                }}
              >
                Reviews
              </NavLink>
            </li>
          </ul>
          <hr></hr>
          <Suspense fallback={<h1>Loading...</h1>}>
            <Route path={`/movies/:movieId/cast`}>
              <Cast />
            </Route>

            <Route path={`/movies/:movieId/reviews`}>
              <Reviews />
            </Route>
          </Suspense>
        </>
      )}
    </>
  );
}
