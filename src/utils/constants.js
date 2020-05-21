export const BASE_URL = 'https://9sf7x3qadg.execute-api.eu-west-1.amazonaws.com/api/';

export const KEY_CODES = {
  enter: 13,
  tab: 9,
  space: 32
};

export const EMPLOYEE_FORM_CONFIG = {
  name: {
    label: 'Full name',
    inputProps: {
      type: 'text'
    },
    validations: {
      required: {
        errorText: 'Please enter the employee\'s full name!'
      }
    }
  },
  age: {
    label: 'Age',
    inputProps: {
      type: 'number'
    },
    validations: {
      required: {
        errorText: 'Please enter the employee\'s age!'
      },
      min: {
        value: 14,
        errorText: 'Please enter a valid working age!'
      },
      max: {
        value: 100,
        errorText: 'Please enter a valid working age!'
      },
      regex: {
        rule: /^[0-9]*$/,
        errorText: 'Please enter a valid age!'
      }
    }
  },
  salary: {
    label: 'Salary',
    inputProps: {
      type: 'number'
    },
    validations: {
      required: {
        errorText: 'Please enter the employee\'s salary!'
      },
      min: {
        value: 0,
        errorText: 'Please enter a valid salary amount!'
      },
    }
  },
  profileImage: {
    label: 'Profile image',
    inputProps: {
      type: 'text'
    }
  }
};
