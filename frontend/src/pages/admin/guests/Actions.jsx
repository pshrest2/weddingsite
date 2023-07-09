import { Button } from "react-bootstrap";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import EditGuestModal from "./EditGuestModal";
import { useState } from "react";

const Actions = ({ value: { guest, actions } }) => {
  const [showEditGuest, setShowEditGuest] = useState(false);

  return (
    <>
      <Button
        className="text-secondary"
        variant="link"
        onClick={() => {
          setShowEditGuest(true);
        }}
      >
        <FontAwesomeIcon icon={faEdit} />
      </Button>
      <Button
        className="text-danger"
        variant="link"
        onClick={() => actions.removeGuest(guest.id)}
      >
        <FontAwesomeIcon icon={faTrash} />
      </Button>

      <EditGuestModal
        show={showEditGuest}
        onHide={() => setShowEditGuest(false)}
        guest={guest}
      />
    </>
  );
};

export default Actions;
