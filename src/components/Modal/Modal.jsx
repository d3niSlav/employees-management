import Close from '@material-ui/icons/Close';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { MODAL_VARS } from './constants';
import Button from '../Button';

import styles from './Modal.module.scss';

const Modal = ({
  actionsPosition = MODAL_VARS.defaultActionsPosition,
  buttonText = 'Ok',
  colorScheme = MODAL_VARS.defaultColorScheme,
  content,
  customActions = null,
  handleModalClose,
  isOpen = false,
  position = MODAL_VARS.defaultPosition,
  showCloseButton = true,
  title
}) => {
  let closeButton = null;
  const [modalClasses, setModalClasses] = useState([styles.modal]);
  const [backdropClasses, setBackdropClasses] = useState([styles.modalBackdrop]);
  const dialogClasses = [styles.modalDialog, styles[position], styles[colorScheme]];
  const footerStyles = [styles.modalFooter, styles[actionsPosition]];

  const closeModal = event => {
    if (event) {
      event.preventDefault();
    }

    setModalClasses([styles.modal]);
    setBackdropClasses([styles.modalBackdrop]);

    setTimeout(() => {
      if (handleModalClose) {
        handleModalClose();
      }
    }, MODAL_VARS.animationDuration);
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setModalClasses([...modalClasses, styles.show]);
      setBackdropClasses([...backdropClasses, styles.show]);
    } else {
      document.body.style.overflow = 'initial';
      closeModal();
    }
  }, [isOpen]);

  if (showCloseButton !== undefined && showCloseButton !== false) {
    closeButton = (
      <button
        className={styles.closeButton}
        type="button"
        aria-label="close"
        onClick={closeModal}
      >
        <Close className={styles.closeIcon} />
      </button>
    );
  }

  return (
    <>
      <div className={modalClasses.join(' ')}>
        <div className={dialogClasses.join(' ')}>
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <h5 className={styles.modalTitle}>{title}</h5>
              {closeButton}
            </div>
            <div className={styles.modalBody}>
              {content}
            </div>
            <div className={footerStyles.join(' ')}>
              {customActions || (
                <Button
                  id="modal-confirmation"
                  buttonText={buttonText}
                  colorScheme={colorScheme}
                  onClick={closeModal}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      <div className={backdropClasses.join(' ')} />
    </>
  );
};

Modal.propTypes = {
  actionsPosition: PropTypes.oneOf(Object.keys(MODAL_VARS.actionsPositions)),
  buttonText: PropTypes.string,
  colorScheme: PropTypes.oneOf(Object.keys(MODAL_VARS.colorSchemes)),
  content: PropTypes.node,
  customActions: PropTypes.node,
  handleModalClose: PropTypes.func.isRequired,
  isOpen: PropTypes.bool,
  position: PropTypes.oneOf(Object.keys(MODAL_VARS.positions)),
  showCloseButton: PropTypes.bool,
  title: PropTypes.node
};

export default Modal;
