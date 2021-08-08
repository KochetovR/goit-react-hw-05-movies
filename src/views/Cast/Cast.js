import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import * as moviesApi from '../../servise/movies-api';

export default function Cast() {
  const { movieId } = useParams();
  const [cast, setCast] = useState(null);

  useEffect(() => {
    moviesApi.fetchFilmActors(movieId).then(res => setCast(res.cast));
  }, [movieId]);

  return (
    <>
      {cast && (
        <ul>
          {cast.map(actor => (
            <li key={actor.id}>
              <img
                src={`https://image.tmdb.org/t/p/w500/${actor.profile_path}`}
                alt={actor.name}
                width="50"
              />
              <p>{actor.name}</p>
              <p>Character: {actor.character}</p>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
