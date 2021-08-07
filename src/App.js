import { Switch, Route } from 'react-router';
import React from 'react';
import './App.css';

const Navigation = React.lazy(() =>
  import(
    './components/Navigation/Navigation.js' /* webpackChunkName: "Navigation" */
  ),
);
const HomePage = React.lazy(() =>
  import('./views/HomePage/HomePage.js' /* webpackChunkName: "HomePage" */),
);
const MoviesPage = React.lazy(() =>
  import('./views/Movies/MoviesPage.js' /* webpackChunkName: "MoviesPage" */),
);
const MovieDetailsPage = React.lazy(() =>
  import(
    './views/MovieDetailsPage/MovieDetailsPage.js' /* webpackChunkName: "MovieDetailsPage" */
  ),
);

const App = () => (
  <>
    <Navigation />

    <Switch>
      <Route exact path="/">
        <HomePage />
      </Route>

      <Route path="/movies" exact>
        <MoviesPage />
      </Route>

      <Route path="/movies/:movieId">
        <MovieDetailsPage />
      </Route>

      <Route path="/">
        <HomePage />
      </Route>
    </Switch>
  </>
);

export default App;
