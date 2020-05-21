import React from 'react';
import PropTypes from 'prop-types';

import { INPUT_VARS } from './constants';

import styles from './Input.module.scss';

const Input = ({
  disabled,
  errorText,
  id,
  inputProps = {},
  label,
  name,
  onBlur = () => {},
  onChange = () => {},
  placeholder,
  required,
  type = INPUT_VARS.inputDefaultType,
  value
}) => {
  let labelContent = null;
  const errorStateClass = !!errorText && !disabled ? 'inputElementError' : 'inputElementNoError';
  const inputClasses = [styles.inputElement, styles[errorStateClass]];
  const labelClasses = [styles.label, disabled ? styles.labelDisabled : '', required ? styles.labelRequired : ''];
  const shouldShowError = errorText && !disabled;

  if (label && typeof label === 'string') {
    labelContent = (
      <label htmlFor={name} className={labelClasses.join(' ')}>
        {label}
      </label>
    );
  }

  return (
    <div className={styles.wrapper}>
      {labelContent}
      <div className={styles.inputWrapper}>
        <div className={styles.inputContent}>
          <input
            id={id}
            type={type}
            name={name}
            aria-label={label || name}
            aria-invalid={!!errorText}
            className={inputClasses.join(' ')}
            value={value}
            placeholder={placeholder || ''}
            required={required}
            disabled={disabled}
            onChange={onChange}
            onBlur={onBlur}
            {...inputProps}
          />
        </div>
        <span className={styles.errorMessage}>{shouldShowError ? errorText : ''}</span>
      </div>
    </div>
  );
};

Input.propTypes = {
  disabled: PropTypes.bool,
  errorText: PropTypes.string,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  inputProps: PropTypes.objectOf(PropTypes.any),
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  type: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

export default Input;
