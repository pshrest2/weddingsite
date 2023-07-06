import { useCallback } from "react";
import { useParams } from "react-router-dom";
import { Modal } from "react-bootstrap";
import { toast } from "react-toastify";

import GuestForm from "./GuestForm";

import { updateGuest } from "../../../api/apiCalls";

const EditGuestModal = ({ show, onHide, guest }) => {
  const { weddingId } = useParams();

  const editGuest = useCallback(
    async (updatedGuest) => {
      try {
        await updateGuest(weddingId, updatedGuest);
        onHide();
      } catch (errorResponse) {
        toast.error(errorResponse.error);
      }
    },
    [onHide, weddingId]
  );

  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Edit Guest</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <GuestForm onSubmit={editGuest} guest={guest} />
      </Modal.Body>
    </Modal>
  );
};

export default EditGuestModal;
