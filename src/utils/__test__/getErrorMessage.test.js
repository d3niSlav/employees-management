import { getErrorMessage } from '../helpers';

describe('error message should be empty string', () => {
  test('error message should be empty string if invalid value is provided', () => {
    expect(getErrorMessage()).toBe('');
    expect(getErrorMessage({})).toBe('');
    expect(getErrorMessage(null)).toBe('');
    expect(getErrorMessage('')).toBe('');
    expect(getErrorMessage(11)).toBe('');
  });

  test('error message should be empty string if invalid validations are provided', () => {
    expect(getErrorMessage('test')).toBe('');
    expect(getErrorMessage('test', {})).toBe('');
    expect(getErrorMessage('test', null)).toBe('');
    expect(getErrorMessage('test', '')).toBe('');
    expect(getErrorMessage('test', 25)).toBe('');
  });
});

describe('"required" validation', () => {
  test('error message should be "Required" when data is invalid', () => {
    expect(getErrorMessage('', {
      required: {
        errorText: 'Required'
      }
    })).toBe('Required');
  });

  test('error message should be "" when data is valid', () => {
    expect(getErrorMessage('Text', {
      required: {
        errorText: 'Required'
      }
    })).toBe('');
  });

  test('error message should be undefined when invalid validation is passed', () => {
    expect(getErrorMessage('', {
      required: {}
    })).toBe(undefined);
  });
});

describe('"regex" validation', () => {
  test('error message should be "Wrong email" when email is invalid', () => {
    expect(getErrorMessage('mail.bg', {
      regex: {
        rule: /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
        errorText: 'Wrong email'
      }
    })).toBe('Wrong email');
  });

  test('error message should be "Wrong email" when email is valid', () => {
    expect(getErrorMessage('test@mail.bg', {
      regex: {
        rule: /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
        errorText: 'Wrong email'
      }
    })).toBe('');
  });

  test('error message should be undefined when invalid validation is passed', () => {
    expect(getErrorMessage('', {
      regex: {}
    })).toBe('');
  });
});

describe('"min" validation', () => {
  test('error message should be "Min is 5" when value is smaller than the min value', () => {
    expect(getErrorMessage(4, {
      min: {
        value: 5,
        errorText: 'Min is 5'
      }
    })).toBe('Min is 5');
  });

  test('error message should be "" when value equals the min value', () => {
    expect(getErrorMessage(5, {
      min: {
        value: 5,
        errorText: 'Min is 5'
      }
    })).toBe('');
  });

  test('error message should be "" when value is bigger than the min value', () => {
    expect(getErrorMessage(10, {
      min: {
        value: 5,
        errorText: 'Min is 5'
      }
    })).toBe('');
  });

  test('error message should be undefined when invalid validation is passed', () => {
    expect(getErrorMessage('', {
      min: {}
    })).toBe('');
  });
});

describe('"max" validation', () => {
  test('error message should be "Max is 5" when value is bigger than the min value', () => {
    expect(getErrorMessage(15, {
      max: {
        value: 5,
        errorText: 'Max is 5'
      }
    })).toBe('Max is 5');
  });

  test('error message should be "" when value equals the max value', () => {
    expect(getErrorMessage(5, {
      max: {
        value: 5,
        errorText: 'Max is 5'
      }
    })).toBe('');
  });

  test('error message should be "" when value is smaller than the max value', () => {
    expect(getErrorMessage(4, {
      max: {
        value: 5,
        errorText: 'Max is 5'
      }
    })).toBe('');
  });

  expect(getErrorMessage('', {
    max: {}
  })).toBe('');
});

describe('"minLength" validation', () => {
  test('error message should be "Min is 5" when value\'s length is smaller than the min value', () => {
    expect(getErrorMessage('Five', {
      minLength: {
        value: 5,
        errorText: 'Min is 5'
      }
    })).toBe('Min is 5');
  });

  test('error message should be "" when value\'s length equals the min value', () => {
    expect(getErrorMessage('Seven', {
      minLength: {
        value: 5,
        errorText: 'Min is 5'
      }
    })).toBe('');
  });

  test('error message should be "" when value\'s length is bigger than the min value', () => {
    expect(getErrorMessage('Eleven', {
      minLength: {
        value: 5,
        errorText: 'Min is 5'
      }
    })).toBe('');
  });

  expect(getErrorMessage('', {
    minLength: {}
  })).toBe('');
});

describe('"maxLength" validation', () => {
  test('error message should be "Max is 5" when value\'s length is bigger than the max value', () => {
    expect(getErrorMessage('Twelve', {
      maxLength: {
        value: 5,
        errorText: 'Max is 5'
      }
    })).toBe('Max is 5');
  });

  test('error message should be "" when value\'s length equals the max value', () => {
    expect(getErrorMessage('Eight', {
      maxLength: {
        value: 5,
        errorText: 'Max is 5'
      }
    })).toBe('');
  });

  test('error message should be "" when value\'s length is smaller than the max value', () => {
    expect(getErrorMessage('One', {
      maxLength: {
        value: 5,
        errorText: 'Max is 5'
      }
    })).toBe('');
  });

  expect(getErrorMessage('', {
    maxLength: {}
  })).toBe('');
});
