import React from 'react';
import { Link } from 'react-router-dom';

import TableLoader from '../TableLoader';
import TableNoRecordsRow from '../TableNoRecordsRow';
import TableRowActions from '../TableRowActions';

import styles from './TableBody.module.scss';

const TableBody = ({
  actions = null,
  columns,
  data,
  isLoading
}) => {
  const renderCellContent = (columnConfig, cellText, recordId) => {
    const {
      type,
      path,
      field,
      align = 'left'
    } = columnConfig;
    let cellContent = '';

    switch (type) {
      case 'link': {
        cellContent = (
          <Link
            className={styles.link}
            to={`${path}/${recordId}`}
          >
            {cellText}
          </Link>
        );
        break;
      }
      case 'currency': {
        cellContent = <span>{cellText} &euro;</span>;
        break;
      }
      default: {
        cellContent = cellText;
      }
    }

    return (
      <td
        key={`${field}-${recordId}`}
        className={[styles.cell, styles[align]].join(' ')}
      >
        {cellContent}
      </td>
    );
  };

  const renderTableRowContent = row => {
    const rowContent = Object.values(columns).map(column => {
      const cellData = row[column.field] || '-';
      const cellText = (typeof cellData === 'object') ? cellData.value : cellData;
      return renderCellContent(column, cellText, row.id);
    });

    return (
      <tr
        key={row.id}
        className={styles.row}
      >
        {rowContent}
        {actions && <TableRowActions actions={actions} data={row} />}
      </tr>
    );
  };

  let tableContent = <TableNoRecordsRow columnsCount={columns.length} />;
  if (data && data.length > 0) {
    tableContent = data.map(bodyRow => renderTableRowContent(bodyRow));
  }

  return (
    <>
      <tbody>
      {tableContent}
      </tbody>
      {isLoading && <TableLoader />}
    </>
  );
};

export default TableBody;
