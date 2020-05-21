import { parseEmployees } from '../helpers';

const rawEmployees = [
  {
    employee_age: '63',
    employee_name: 'Garrett Winters',
    employee_salary: '170750',
    id: '1',
    profile_image: ''
  }
];

const formattedEmployees = [
  {
    age: 63,
    id: 1,
    name: 'Garrett Winters',
    profileImage: '',
    salary: 170750
  }
];

describe('convert array of employees to array of formatted employees', () => {
  test('successfully convert the array', () => {
    const employees = [...rawEmployees];
    expect(JSON.stringify(parseEmployees(employees))).toBe(JSON.stringify(formattedEmployees));
  });
});
