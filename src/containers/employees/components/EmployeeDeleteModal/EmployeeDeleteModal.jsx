import React from 'react';
import PropTypes from 'prop-types';

import Button from '../../../../components/Button';
import Modal from '../../../../components/Modal';

const EmployeeDeleteModal = ({
  employeeForDeletion,
  onDeletionCancel,
  onDeletionConfirm
}) => {
  const clearConfirmationActions = (
    <>
      <Button
        id="clear-form-confirm"
        buttonText="Yes"
        colorScheme="error"
        onClick={() => onDeletionConfirm(employeeForDeletion.id)}
        outlined
      />
      <Button
        id="clear-form-reject"
        buttonText="No"
        colorScheme="error"
        onClick={onDeletionCancel}
      />
    </>
  );

  return (
    <Modal
      isOpen={!!employeeForDeletion}
      colorScheme="error"
      title="Delete an employee"
      content={`Are you sure you want to remove ${employeeForDeletion ? employeeForDeletion.name : ''}?`}
      customActions={clearConfirmationActions}
      handleModalClose={onDeletionCancel}
    />
  );
};

EmployeeDeleteModal.propTypes = {
  employeeForDeletion: PropTypes.shape({
    age: PropTypes.number,
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    name: PropTypes.string,
    profileImage: PropTypes.string,
    salary: PropTypes.number
  }),
  onDeletionCancel: PropTypes.func,
  onDeletionConfirm: PropTypes.func
};

export default EmployeeDeleteModal;
