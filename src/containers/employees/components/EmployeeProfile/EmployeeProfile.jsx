import { Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import EmployeeDeleteModal from '../EmployeeDeleteModal';
import EmployeeUpdateModal from '../EmployeeUpdateModal';
import ProfileCard from '../../../../components/ProfileCard';
import { deleteEmployee, readEmployee, updateEmployee } from '../../../../services/employeeService';
import { convertEmployeeObject } from '../../../../utils/helpers';

const EmployeeProfile = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [employee, setEmployee] = useState(null);
  const [employeeForDeletion, setEmployeeForDeletion] = useState(null);
  const [employeeForEdit, setEmployeeForEdit] = useState(null);
  const { employeeId } = useParams();
  const history = useHistory();

  const loadEmployee = employeeId => {
    setIsLoading(true);
    readEmployee(employeeId)
      .then(employee => {
        setEmployee(convertEmployeeObject(employee));
        setIsLoading(false);
      })
      .catch(error => {
        setIsLoading(false);
        alert(error);
      });
  };

  useEffect(() => {
    loadEmployee(employeeId);
  }, [employeeId]);

  const openEditEmployeeModal = () => {
    setEmployeeForEdit(employee);
  };

  const clearEmployeeForEdit = () => {
    setEmployeeForEdit(null);
  };

  const editEmployee = employeeData => {
    const { id, name, profileImage, age, salary } = employeeData;
    const updatedEmployee = {
      id,
      employee_age: parseInt(age),
      employee_name: name,
      employee_salary: parseFloat(salary),
      profile_image: profileImage
    };

    setIsLoading(true);
    updateEmployee(updatedEmployee)
      .then(updatedEmployee => {
        setEmployeeForEdit(null);
        setEmployee(convertEmployeeObject(updatedEmployee));
        setIsLoading(false);
      })
      .catch(error => {
        setEmployeeForEdit(null);
        setIsLoading(false);
        alert(error);
      });
  };

  const openDeleteEmployeeModal = () => {
    setEmployeeForDeletion(employee);
  };

  const removeEmployee = () => {
    setIsLoading(true);
    deleteEmployee(employee.id)
      .then(() => {
        setEmployeeForDeletion(null);
        setIsLoading(false);
        history.push('/');
      })
      .catch(error => {
        setIsLoading(false);
        alert(error);
      });
  };

  const clearEmployeeForDeletion = () => {
    setEmployeeForDeletion(null);
  };

  return employee && (
    <>
      <ProfileCard
        {...employee}
        onEditClick={openEditEmployeeModal}
        onDeleteClick={openDeleteEmployeeModal}
      />
      <EmployeeDeleteModal
        employeeForDeletion={employeeForDeletion}
        onDeletionCancel={clearEmployeeForDeletion}
        onDeletionConfirm={removeEmployee}
      />
      <EmployeeUpdateModal
        employeeToEdit={employeeForEdit}
        onEditCancel={clearEmployeeForEdit}
        onEditConfirm={editEmployee}
      />
      {isLoading && (
        <Typography align="center" variant="h6" component="p">
          Loading...
        </Typography>
      )}
    </>
  );
};

export default EmployeeProfile;
