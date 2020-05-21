import React from 'react';
import PropTypes from 'prop-types';

import Button from '../../../../components/Button';
import Form from '../../../../components/Form';
import Modal from '../../../../components/Modal';
import { EMPLOYEE_FORM_CONFIG } from '../../../../utils/constants';

const EmployeeEditModal = ({
  employeeToEdit,
  onEditCancel,
  onEditConfirm
}) => {
  const cancelButton = (
    <Button
      id="clear-form-reject"
      buttonText="Cancel"
      colorScheme="primary"
      onClick={onEditCancel}
    />
  );

  const editForm = employeeToEdit && (
    <Form
      additionalActions={cancelButton}
      config={EMPLOYEE_FORM_CONFIG}
      initialValues={employeeToEdit}
      onFormSubmit={onEditConfirm}
    />
  );

  return (
    <Modal
      isOpen={!!employeeToEdit}
      colorScheme="primary"
      title="Edit an employee"
      content={editForm}
      customActions={<></>}
      handleModalClose={onEditCancel}
    />
  );
};

EmployeeEditModal.propTypes = {
  employeeToEdit: PropTypes.shape({
    age: PropTypes.number,
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    name: PropTypes.string,
    profileImage: PropTypes.string,
    salary: PropTypes.number
  }),
  onEditCancel: PropTypes.func,
  onEditConfirm: PropTypes.func
};

export default EmployeeEditModal;
