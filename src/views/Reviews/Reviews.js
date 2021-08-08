import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import * as moviesApi from '../../servise/movies-api';

import styles from './Reviews.module.css';

export default function Reviews() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    moviesApi.fetchFilmReviews(movieId).then(res => setReviews(res.results));
  }, [movieId]);

  return (
    <>
      {reviews.length !== 0 ? (
        <ul>
          {reviews.map(view => (
            <li key={view.id}>
              <p className={styles.author}>{view.author}</p>
              <span>{view.content}</span>
            </li>
          ))}
        </ul>
      ) : (
        <h1>we don't have any reviews for this movie</h1>
      )}
    </>
  );
}
