import { Modal } from "react-bootstrap";

import GuestForm from "./GuestForm";

const EditGuestModal = ({ show, onHide, guest, onSubmit }) => {
  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Edit Guest</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <GuestForm onSubmit={onSubmit} guest={guest} />
      </Modal.Body>
    </Modal>
  );
};

export default EditGuestModal;
