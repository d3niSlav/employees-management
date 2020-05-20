import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import EmployeeDeleteModal from '../EmployeeDeleteModal';
import EmployeeEditModal from '../EmployeeEditModal';
import ProfileCard from '../../../../components/ProfileCard';
import { convertEmployeeObject } from '../../../../utils/helpers';
import { del, get, put } from '../../../../utils/requestWrapper';

const EmployeeProfile = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [employee, setEmployee] = useState(null);
  const [employeeForDeletion, setEmployeeForDeletion] = useState(null);
  const [employeeForEdit, setEmployeeForEdit] = useState(null);
  const { employeeId } = useParams();
  const history = useHistory();

  const openDeleteEmployeeModal = () => {
    setEmployeeForDeletion(employee);
  };

  const deleteEmployee = () => {
    setIsLoading(true);
    del(`/employee/${employee.id}`)
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

  const openEditEmployeeModal = () => {
    setEmployeeForEdit(employee);
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

    put(`/employee/${id}`, updatedEmployee)
      .then(updatedEmployee => {
        setEmployeeForEdit(null);
        setEmployee(convertEmployeeObject(updatedEmployee));
      })
      .catch(error => {
        setEmployeeForEdit(null);
        console.log(error);
      });
  };

  const clearEmployeeForEdit = () => {
    setEmployeeForEdit(null);
  };

  const loadEmployee = employeeId => {
    setIsLoading(true);
    get(`/employee/${employeeId}`)
      .then(employee => {
        setEmployee(convertEmployeeObject(employee));
        setIsLoading(false);
      })
      .catch(error => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    loadEmployee(employeeId);
  }, [employeeId]);

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
        onDeletionConfirm={deleteEmployee}
      />
      <EmployeeEditModal
        employeeToEdit={employeeForEdit}
        onEditCancel={clearEmployeeForEdit}
        onEditConfirm={editEmployee}
      />
    </>
  );
};

export default EmployeeProfile;
