import { X } from 'react-bootstrap-icons';
import Modal from 'react-modal';
import './Modal.css';

const CustomModal = (props) => {
    return (
        <Modal
            isOpen={props.modalIsOpen}
            contentLabel="WithdrawInvestModal"
        >   
            <X size={24} color={'white'} className="modal-close" onClick={() => props.onCloseButtonClick()}></X>
            {props.children}
        </Modal>
    );
}

export default CustomModal;

