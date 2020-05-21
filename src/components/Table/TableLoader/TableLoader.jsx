import React from 'react';

import styles from './TableLoader.module.scss';

const TableLoader = () => (
  <tbody className={styles.tableLoaderWrapper}>
    <tr className={styles.loaderRow}>
      <td className={styles.loader}>
        Loading...
      </td>
    </tr>
  </tbody>
);

export default TableLoader;
