import Icon from '@material-ui/core/Icon';
import React from 'react';
import PropTypes from 'prop-types';

import Button from '../../Button';

const TableRowActions = ({ actions, data }) => {
  const actionButtons = actions.map(({ icon, onClick, tooltip, color }) => {
    const handleOnClick = event => {
      event.preventDefault();
      onClick(data);
    };

    return (
      <Button
        id={`${icon}-${data.id}`}
        key={`${icon}-${data.id}`}
        title={tooltip}
        buttonText={<Icon>{icon}</Icon>}
        onClick={handleOnClick}
        size="sm"
        colorScheme={color}
      />
    );
  });

  return (
    <td>
      {actionButtons}
    </td>
  );
};

export const actionsTypes = PropTypes.shape({
  color: PropTypes.string,
  icon: PropTypes.string,
  onClick: PropTypes.func,
  tooltip: PropTypes.string
});

TableRowActions.propTypes = {
  actions: PropTypes.arrayOf(actionsTypes),
  data: PropTypes.objectOf(PropTypes.any)
};

export default TableRowActions;
