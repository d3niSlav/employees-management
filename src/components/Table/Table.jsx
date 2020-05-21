import { Add } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import TableBody from './TableBody';
import TableFilter from './TableFilter';
import TableHeader from './TableHeader';
import { actionsTypes } from './TableRowActions';
import Button from '../Button';
import { compareObjects } from '../../utils/helpers';

import styles from './Table.module.scss';

const Table = ({
  actions = null,
  columns,
  data,
  headerButtonConfig = null,
  isLoading = false,
  onFilterSubmit = null,
  title
}) => {
  const [tableData, setTableData] = useState([]);
  const [fieldToSortBy, setFieldToSortBy] = useState('id');
  const [order, setOrder] = useState('asc');

  useEffect(() => {
    setTableData(data);
  }, [data]);

  const handleColumnSort = fieldName => {
    const sortedData = [...tableData];
    const newOrder = (fieldName === fieldToSortBy && order === 'asc') ? 'desc' : 'asc';
    setFieldToSortBy(fieldName);
    setOrder(newOrder);

    sortedData.sort(compareObjects(fieldName, newOrder));
    setTableData(sortedData);
  };

  const renderTableHeader = () => (
    <TableHeader
      actions={actions}
      selectedField={fieldToSortBy}
      selectedOrder={order}
      columns={columns}
      onColumnSort={handleColumnSort}
    />
  );

  const renderTableBody = () => (
    <TableBody
      actions={actions}
      columns={columns}
      data={tableData}
      isLoading={isLoading}
    />
  );

  return (
    <div className={styles.tableWrapper}>
      <div className={styles.header}>
        <div className={styles.headerTitleWrapper}>
          <h1 className={styles.title}>{title}</h1>
          {headerButtonConfig && (
            <div className={styles.addButtonWrapperLeft}>
              <Button
                id="new-employee-button"
                size="sm"
                colorScheme="success"
                buttonText={<Add />}
                onClick={headerButtonConfig.onClick}
              />
            </div>
          )}
        </div>
        <div className={styles.headerActions}>
          {onFilterSubmit && <TableFilter onFilterSubmit={onFilterSubmit} />}
          {headerButtonConfig && (
            <div className={styles.addButtonWrapperRight}>
              <Button
                id="create-employee-button"
                size="md"
                colorScheme="success"
                buttonText={headerButtonConfig.text}
                onClick={headerButtonConfig.onClick}
              />
            </div>
          )}
        </div>
      </div>
      <table className={styles.table}>
        {renderTableHeader()}
        {renderTableBody()}
      </table>
    </div>
  );
};

Table.propTypes = {
  actions: PropTypes.arrayOf(actionsTypes),
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  headerButtonConfig: PropTypes.shape({
    onClick: PropTypes.func,
    text: PropTypes.string
  }),
  isLoading: PropTypes.bool,
  onFilterSubmit: PropTypes.func,
  title: PropTypes.string
};

export default Table;
