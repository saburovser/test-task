import React from 'react';
import Modal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBan, faTimes } from '@fortawesome/free-solid-svg-icons';

Modal.setAppElement(document.getElementById('app'))

export default (props) => (
    <Modal
        className="MODAL"
        overlayClassName="OVERLAY"
        contentLabel={'error'}
        isOpen={!!props.error}
        onRequestClose={props.onModalClose}
    >
        <FontAwesomeIcon 
            icon={faBan}
            className="MODAL__ERROR"
            size="3x"
            onClick={props.onModalClose}
        />
        <h3>Ошибка!</h3>
        <p>{props.error}</p>
        <button onClick={props.onModalClose}>
            <FontAwesomeIcon 
                icon={faTimes}
                color="gray"
                size="2x"
                onClick={props.onModalClose}
            />
        </button>
    </Modal>
);