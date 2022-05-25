import React from 'react';
import ReactDOM  from 'react-dom';

import styles from './Modal.module.css';

const BackDrop = (props) => (
    <div className={styles.backdrop} onClick={props.onClick}  />
)

const ModalOverlay = props => (
    <div className={styles.modal} >
        <div className={styles.content} >
            {props.children}
        </div>
    </div>
)

const portalElement = document.getElementById('overlays')
function Modal(props) {

    return (
        <>
        {ReactDOM.createPortal(<BackDrop onClick={props.onClose}/>,portalElement)}
        {ReactDOM.createPortal(<ModalOverlay>{props.children}</ModalOverlay>,portalElement)}
        </>
    );
}

export default Modal;