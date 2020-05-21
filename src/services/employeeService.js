import { del, get, post, put } from '../utils/requestWrapper';

export const createEmployee = employeeData => {
  return post('/employee', employeeData);
};

export const readAllEmployees = () => {
  return get(`/employee`);
};

export const readEmployee = employeeId => {
  return get(`/employee/${employeeId}`);
};

export const updateEmployee = employeeData => {
  return employeeData.id
    ? put(`/employee/${employeeData.id}`, employeeData)
    : createEmployee(employeeData);
};

export const deleteEmployee = employeeId => {
  return del(`/employee/${employeeId}`);
};
