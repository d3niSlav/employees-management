import React from 'react';
import PropTypes from 'prop-types';

import { BUTTON_VARS } from './constants';

import styles from './Button.module.scss';

const Button = ({
  buttonText = '',
  buttonType = BUTTON_VARS.defaultType,
  colorScheme = BUTTON_VARS.defaultColorScheme,
  disabled,
  id,
  onBlur = () => {},
  onClick = () => {},
  size = BUTTON_VARS.defaultInputSize
}) => {
  const buttonClasses = [
    styles.button,
    styles[colorScheme],
    styles[size]
  ];

  const handleClick = event => {
    if (buttonType !== BUTTON_VARS.types.submit) {
      event.preventDefault();
    }

    onClick(event);
  };

  return (
    <button
      id={id}
      data-testid={id}
      type={buttonType}
      disabled={disabled}
      className={buttonClasses.join(' ')}
      onClick={handleClick}
      onBlur={onBlur}
    >
      {buttonText}
    </button>
  );
};

Button.propTypes = {
  buttonText: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  buttonType: PropTypes.oneOf(Object.keys(BUTTON_VARS.types)),
  colorScheme: PropTypes.oneOf(Object.keys(BUTTON_VARS.colorSchemes)),
  disabled: PropTypes.bool,
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  onBlur: PropTypes.func,
  onClick: PropTypes.func,
  size: PropTypes.oneOf(Object.keys(BUTTON_VARS.inputSizes))
};

export default Button;
