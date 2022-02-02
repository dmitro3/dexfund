import { useEffect, useState } from 'react';
import { X } from 'react-bootstrap-icons';
import Modal from 'react-modal';
import './Modal.css';

const CustomModal = (props) => {
    const [overlayRef, setOverlayRef] = useState();
    useEffect(() => {
        if (overlayRef) {
            overlayRef.addEventListener('click', (e) => {
                props.onCloseButtonClick();
            })
        }
    }, [overlayRef]);
    return (
        <Modal
            isOpen={props.modalIsOpen}
            contentLabel="WithdrawInvestModal"
            shouldCloseOnOverlayClick={true}
            shouldCloseOnEsc={true}
            // overlayRef={node => (setOverlayRef(node))}
        >   
            <X size={24} color={'white'} className="modal-close" onClick={() => props.onCloseButtonClick()}></X>
            {props.children}
        </Modal>
    );
}

export default CustomModal;

