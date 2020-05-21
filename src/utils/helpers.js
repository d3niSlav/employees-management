export const compareObjects = (key, order = 'asc') => {
  return (firstObject, secondObject) => {
    if (!firstObject.hasOwnProperty(key) || !secondObject.hasOwnProperty(key)) {
      return 0;
    }

    const firstValue = typeof firstObject[key] === 'string'
      ? firstObject[key].toUpperCase()
      : firstObject[key];

    const secondValue = typeof secondObject[key] === 'string'
      ? secondObject[key].toUpperCase()
      : secondObject[key];

    let comparison = 0;
    if (firstValue > secondValue) {
      comparison = 1;
    } else if (firstValue < secondValue) {
      comparison = -1;
    }

    return order === 'desc' ? comparison * -1 : comparison;
  };
};

export const convertEmployeeObject = ({
  id,
  employee_age,
  employee_name,
  employee_salary,
  profile_image
}) => ({
  age: parseInt(employee_age),
  id: parseInt(id),
  name: employee_name,
  profileImage: profile_image,
  salary: parseFloat(employee_salary)
});

export const parseEmployees = employeesList => {
  return employeesList.map(employee => convertEmployeeObject(employee));
};

export const getErrorMessage = (value, validations) => {
  let errorMessage = '';

  if (validations) {
    if (validations.required && !value) {
      errorMessage = validations.required.errorText;
    }

    if (validations.regex && validations.regex.rule instanceof RegExp && !validations.regex.rule.test(value)) {
      errorMessage = validations.required.errorText;
    }

    if (validations.min && +value < validations.min.value) {
      errorMessage = validations.min.errorText;
    }

    if (validations.max && +value > validations.max.value) {
      errorMessage = validations.max.errorText;
    }

    if (validations.minLength && value && value.length < validations.minLength.value) {
      errorMessage = validations.minLength.errorText;
    }

    if (validations.maxLength && value && value.length > validations.maxLength.value) {
      errorMessage = validations.minLength.errorText;
    }
  }

  return errorMessage;
};
