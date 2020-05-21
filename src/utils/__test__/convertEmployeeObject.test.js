import { convertEmployeeObject } from '../helpers';

const rawEmployeeObject = {
  employee_age: '63',
  employee_name: 'Garrett Winters',
  employee_salary: '170750',
  id: '2',
  profile_image: ''
};

const formattedEmployeeObject = {
  age: 63,
  id: 2,
  name: 'Garrett Winters',
  profileImage: '',
  salary: 170750
};

const formattedEmployeeObjectWithWringAge = {
  age: NaN,
  id: 2,
  name: 'Garrett Winters',
  profileImage: '',
  salary: 170750
};

describe('convert employee object', () => {
  test('successfully convert object', () => {
    const employee = {...rawEmployeeObject};
    expect(JSON.stringify(convertEmployeeObject(employee))).toBe(JSON.stringify(formattedEmployeeObject));
  });

  test('successfully convert object with wrong data', () => {
    const employee = {
      ...rawEmployeeObject,
      employee_age: '-'
    };

    expect(JSON.stringify(convertEmployeeObject(employee))).toBe(JSON.stringify(formattedEmployeeObjectWithWringAge));
  });
});
