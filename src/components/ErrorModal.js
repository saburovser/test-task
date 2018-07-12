import React from 'react';
import Modal from 'react-modal';


Modal.setAppElement(document.getElementById('app'))

export default (props) => (
    <Modal
        className="MODAL"
        overlayClassName="OVERLAY"
        contentLabel={'error'}
        isOpen={!!props.error}
        onRequestClose={props.onModalClose}
    >
        <img src="./img/error.png"/>
        <h3>Ошибка!</h3>
        <p>{props.error}</p>
        <button onClick={props.onModalClose}></button>
    </Modal>
);