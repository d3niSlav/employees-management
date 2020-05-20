import { Card, CardActions, CardContent, Grid, Typography } from '@material-ui/core';
import React from 'react';
import PropTypes from 'prop-types';

import Button from '../Button';
import defaultProfileImage from '../../assets/images/default-profile-image.png';

import styles from './ProfileCard.module.scss';

const ProfileCard = ({
  age,
  name,
  onDeleteClick,
  onEditClick,
  profileImage = defaultProfileImage,
  salary
}) => (
  <Card className={styles.card}>
    <CardContent>
      <Typography align="center" variant="h4" component="h2">
        {name}
      </Typography>
      <Typography align="center" variant="h6" component="p">
        <span className={styles.employeeSubtitle}>Employee</span>
      </Typography>
      <img
        className={styles.avatar}
        src={profileImage || defaultProfileImage}
        alt={name}
      />
      <hr />
      <p className={styles.details}>
        <strong>Age:</strong> <span>{age}</span>
      </p>
      <p className={styles.details}>
        <strong>Salary:</strong> <span>{salary} &euro;</span>
      </p>
      <hr />
    </CardContent>
    <CardActions>
      <Grid container justify="space-between">
        <Button
          id="edit-employee"
          buttonText="Edit"
          colorScheme="primary"
          size="lg"
          onClick={onEditClick}
        />
        <Button
          id="delete-employee"
          buttonText="Delete"
          colorScheme="error"
          size="lg"
          onClick={onDeleteClick}
        />
      </Grid>
    </CardActions>
  </Card>
);

ProfileCard.propTypes = {
  age: PropTypes.number,
  name: PropTypes.string,
  onDeleteClick: PropTypes.func,
  onEditClick: PropTypes.func,
  profileImage: PropTypes.string,
  salary: PropTypes.number
};

export default ProfileCard;
