import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import Button from '../Button';
import Input from '../Input';
import { getErrorMessage } from '../../utils/helpers';

import styles from './Form.module.scss';

const Form = ({
  additionalActions,
  config,
  initialValues = {},
  onFormSubmit
}) => {
  const [controls, setControls] = useState({});
  const [isFormInvalid, setIsFormInvalid] = useState(true);

  useEffect(() => {
    const controlsData = {};
    Object.keys(config).forEach(fieldKey => {
      controlsData[fieldKey] = {
        ...config[fieldKey],
        name: fieldKey,
        id: fieldKey,
        required: !!(config[fieldKey].validations && config[fieldKey].validations.required),
        valid: !config[fieldKey].validations
          || (config[fieldKey].validations && getErrorMessage(config[fieldKey].value, config[fieldKey].validations)),
        touched: false,
        value: config[fieldKey].value || initialValues[fieldKey] || '',
        errorText: ''
      };
    });

    const hasError = Object.values(controlsData).some(control => control && !control.valid);
    setIsFormInvalid(hasError);
    setControls(controlsData);
  }, [config, initialValues]);

  const inputChangedHandler = event => {
    const { name, value } = event.target;
    const error = getErrorMessage(value, controls[name].validations);
    const updatedControls = {
      ...controls,
      [name]: {
        ...controls[name],
        value,
        valid: !error,
        touched: true,
        errorText: error
      }
    };

    const hasError = Object.values(updatedControls).some(control => control && !control.valid);
    setIsFormInvalid(hasError);
    setControls(updatedControls);
  };

  const handleFormSubmit = event => {
    event.preventDefault();

    const formData = {};
    Object.keys(controls).forEach(fieldKey => {
      formData[fieldKey] = controls[fieldKey].value;
    });

    if (initialValues.id) {
      formData.id = initialValues.id;
    }

    onFormSubmit(formData);
  };

  const formFields = Object.keys(controls).map(controlKey => (
    <Input
      key={controlKey}
      {...controls[controlKey]}
      onChange={inputChangedHandler}
      onBlur={inputChangedHandler}
    />
  ));

  return (
    <form onSubmit={handleFormSubmit}>
      {formFields}
      <div className={styles.actionsWrapper}>
        <Button
          id="form-submit"
          buttonText="Confirm"
          disabled={isFormInvalid}
          buttonType="submit"
        />
        {additionalActions}
      </div>
    </form>
  );
};

Form.propTypes = {
  additionalActions: PropTypes.node,
  config: PropTypes.objectOf(PropTypes.any),
  onFormSubmit: PropTypes.func,
  initialValues: PropTypes.objectOf(PropTypes.any)
}

export default Form;
