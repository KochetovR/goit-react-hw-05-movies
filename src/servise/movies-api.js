const BASE_URL = 'https://api.themoviedb.org/3';
const KEY = '9caebb83ffe8fba795968469eac8d7a6';
const LANG = 'en-US';
const PAGE = '1';

async function fetchWithErrorHandling(url = '', config = {}) {
  const response = await fetch(url, config);
  return response.ok
    ? await response.json()
    : Promise.reject(new Error('Not found'));
}

export function fetchPopularFilmsToday() {
  return fetchWithErrorHandling(
    `${BASE_URL}/trending/movie/day?api_key=${KEY}&language=${LANG}&page=${PAGE}`,
  );
}

export function fetchSearchFilm(query) {
  return fetchWithErrorHandling(
    `${BASE_URL}/search/movie?api_key=${KEY}&language=${LANG}&query=${query}&page=${PAGE}`,
  );
}

export function fetchFilmId(id) {
  return fetchWithErrorHandling(
    `${BASE_URL}/movie/${id}?api_key=${KEY}&language=${LANG}`,
  );
}

export function fetchFilmActors(id) {
  return fetchWithErrorHandling(
    `${BASE_URL}/movie/${id}/credits?api_key=${KEY}&language=${LANG}`,
  );
}

export function fetchFilmReviews(id) {
  return fetchWithErrorHandling(
    `${BASE_URL}/movie/${id}/reviews?api_key=${KEY}&language=${LANG}&page=${PAGE}`,
  );
}
