import { Container, Typography } from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import styles from './NotFounde.module.scss';

const NotFound = ({ resource = 'page' }) => (
  <Container>
    <Typography
      align="center"
      variant="h1"
      component="h1"
      className={styles.header}
    >
      Oops!
    </Typography>
    <Typography
      align="center"
      variant="body1"
      component="p"
      className={styles.message}
    >
      The {resource} you're looking for is not here.
    </Typography>
    <p className={styles.linkWrapper}>
      <Link to="/">
        Go back to home page
      </Link>
    </p>
  </Container>
);

NotFound.propTypes = {
  resource: PropTypes.string
};

export default NotFound;
