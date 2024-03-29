import { NavLink } from 'react-router-dom';

import styles from './Navigation.module.css';

const Navigation = () => {
  return (
    <>
      <nav>
        <NavLink
          exact
          to="/"
          className={styles.link}
          activeClassName={styles.activeLink}
        >
          Home
        </NavLink>

        <NavLink
          to="/movies"
          className={styles.link}
          activeClassName={styles.activeLink}
        >
          Movies
        </NavLink>
      </nav>
      <hr></hr>
    </>
  );
};

export default Navigation;
