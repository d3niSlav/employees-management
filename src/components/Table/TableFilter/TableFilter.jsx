import { Search } from '@material-ui/icons';
import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Button from '../../Button';
import Input from '../../Input';

import styles from './TableFilter.module.scss';

const TableFilter = ({ onFilterSubmit }) => {
  const [filterQuery, setFilterQuery] = useState('');

  const filterInputChangeHandler = event => {
    const { value } = event.target;
    setFilterQuery(value.trim());
  };

  const handleSearchSubmit = event => {
    event.preventDefault();
    onFilterSubmit(filterQuery);
  };

  return (
    <form onSubmit={handleSearchSubmit} className={styles.formWrapper}>
      <Input
        id="filter-query"
        name="filter-query"
        placeholder="Filter by name..."
        onChange={filterInputChangeHandler}
        onBlur={filterInputChangeHandler}
      />
      <div className={styles.actions}>
        <Button
          id="filter-button"
          size="sm"
          buttonType="submit"
          buttonText={<Search />}
        />
      </div>
    </form>
  );
};

TableFilter.propTypes = {
  onFilterSubmit: PropTypes.func
};

export default TableFilter;
