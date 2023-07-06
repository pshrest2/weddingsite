import { useCallback } from "react";
import { Button, Modal } from "react-bootstrap";

import GuestForm from "./GuestForm";

const EditGuestModal = ({ show, onHide, guest }) => {
  const editGuest = useCallback(async () => {}, []);

  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Edit Guest</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <GuestForm onSubmit={editGuest} guest={guest} />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
        <Button onClick={editGuest}>Save</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditGuestModal;
