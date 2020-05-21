import React, { useEffect, useState } from 'react';

import EmployeeDeleteModal from '../EmployeeDeleteModal';
import EmployeeUpdateModal from '../EmployeeUpdateModal';
import Table from '../../../../components/Table';
import { deleteEmployee, readAllEmployees, updateEmployee } from '../../../../services/employeeService';
import { compareObjects, parseEmployees } from '../../../../utils/helpers';

function EmployeesList() {
  const [isLoading, setIsLoading] = useState(true);
  const [allEmployees, setAllEmployees] = useState([]);
  const [employeeList, setEmployeeList] = useState([]);
  const [employeeForDeletion, setEmployeeForDeletion] = useState(null);
  const [employeeForEdit, setEmployeeForEdit] = useState(null);

  const loadEmployees = () => {
    setIsLoading(true);
    readAllEmployees()
      .then(employees => {
        const employeesData = parseEmployees(employees).sort(compareObjects('id', 'asc'));
        setAllEmployees(employeesData);
        setEmployeeList(employeesData);

        setIsLoading(false);
      })
      .catch(error => {
        setIsLoading(false);
        alert(error);
      });
  };

  useEffect(() => {
    loadEmployees();
  }, []);

  const openCreateEmployeeModal = () => {
    setEmployeeForEdit({});
  };

  const openEditEmployeeModal = employeeData => {
    setEmployeeForEdit(employeeData);
  };

  const clearEmployeeForEdit = () => {
    setEmployeeForEdit(null);
  };

  const editEmployee = employeeData => {
    const { id, name, profileImage, age, salary } = employeeData;
    const updatedEmployee = {
      employee_age: parseInt(age),
      employee_name: name,
      employee_salary: parseFloat(salary),
      profile_image: profileImage
    };

    updateEmployee({ ...updatedEmployee, id })
      .then(() => {
        setEmployeeForEdit(null);
        loadEmployees();
      })
      .catch(error => {
        alert(error);
      });
  };

  const openDeleteEmployeeModal = employeeData => {
    setEmployeeForDeletion(employeeData);
  };

  const clearEmployeeForDeletion = () => {
    setEmployeeForDeletion(null);
  };

  const removeEmployee = employeeId => {
    deleteEmployee(employeeId)
      .then(() => {
        setEmployeeForDeletion(null);
        loadEmployees();
      })
      .catch(error => {
        alert(error);
      });
  };

  const handleFilterSubmit = query => {
    if (query) {
      const filteredEmployees = allEmployees.filter(employee => {
        const employeeName = (employee && employee.name) ? employee.name.toLowerCase() : null;
        return employeeName ? employeeName.indexOf(query.toLowerCase()) >= 0 : false;
      });

      setEmployeeList(filteredEmployees);
    } else {
      setEmployeeList(allEmployees);
    }
  };

  return (
    <>
      <Table
        title="Employees"
        isLoading={isLoading}
        data={employeeList}
        columns={[
          { title: 'Id', field: 'id', width: 60 },
          { title: 'Name', field: 'name', type: 'link', path: '/view' },
          { title: 'Age', field: 'age', type: 'number', width: 100 },
          { title: 'Salary', field: 'salary', type: 'currency', width: 100, align: 'center' }
        ]}
        headerButtonConfig={{
          text: 'Add employee',
          onClick: openCreateEmployeeModal
        }}
        actions={[
          {
            color: 'primary',
            icon: 'edit',
            tooltip: 'Edit employee',
            onClick: openEditEmployeeModal
          },
          {
            color: 'error',
            icon: 'delete',
            tooltip: 'Delete employee',
            onClick: openDeleteEmployeeModal
          }
        ]}
        onFilterSubmit={handleFilterSubmit}
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
    </>
  );
}

export default EmployeesList;
