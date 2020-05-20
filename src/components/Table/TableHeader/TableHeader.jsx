import React from 'react';
import PropTypes from 'prop-types';

import { KEY_CODES } from '../../../utils/constants';

import styles from './TableHeader.module.scss';

const TableHeader = ({
  actions = null,
  columns,
  onColumnSort = () => {},
  selectedField = 'id',
  selectedOrder = 'asc'
}) => {
  const handleColumnKeyPress = (event, sortBy) => {
    const pressedKey = event.which;

    if (pressedKey === KEY_CODES.enter || pressedKey === KEY_CODES.space) {
      event.preventDefault();
      onColumnSort(sortBy);
    }
  };

  return (
    <thead>
    <tr className={styles.headerRow}>
      {columns.map(({ title, field, isSortable = true, width }) => {
        const sortingArrowsClasses = [styles.arrows];
        if (isSortable && selectedField === field) {
          sortingArrowsClasses.push(styles[selectedOrder]);
        }

        return (
          <th
            key={field}
            className={styles.columnHeader}
            tabIndex="0"
            onKeyDown={isSortable ? event => handleColumnKeyPress(event, field) : null}
            onClick={isSortable ? () => onColumnSort(field) : null}
            width={width}
          >
            {title}
            {isSortable && <span className={sortingArrowsClasses.join(' ')} />}
          </th>
        )
      })}
      {actions && <th width={Object.keys(actions).length * 60} />}
    </tr>
    </thead>
  );
};

TableHeader.propTypes = {
  actions: PropTypes.arrayOf(PropTypes.any),
  columns: PropTypes.arrayOf(PropTypes.any).isRequired,
  onColumnSort: PropTypes.func,
  selectedField: PropTypes.string,
  selectedOrder: PropTypes.string
};

export default TableHeader;
