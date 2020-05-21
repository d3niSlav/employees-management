import React from 'react';
import PropTypes from 'prop-types';

import styles from './TableNoRecordsRow.module.scss';

const TableNoRecordsRow = ({ columnsCount = 1 }) => (
  <tr className={styles.noContentRow}>
    <td colSpan={columnsCount} className={styles.noContentCell}>
      No records.
    </td>
  </tr>
);

TableNoRecordsRow.propTypes = {
  columnsCount: PropTypes.number
};

export default TableNoRecordsRow;
