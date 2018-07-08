import React from 'react';
import Modal from 'react-modal';


Modal.setAppElement(document.getElementById('app'))

export default (props) => (
    <Modal
        contentLabel={'error'}
        isOpen={!!props.error}
        onRequestClose={props.onModalClose}
    >
        <p>{props.error}</p>
        <button onClick={props.onModalClose}>ОК</button>
    </Modal>
);