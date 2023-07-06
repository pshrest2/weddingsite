import { Button } from "react-bootstrap";
import { faFileEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Actions = ({ value: { id, actions } }) => {
  return (
    <>
      <Button variant="link" onClick={() => {}}>
        <FontAwesomeIcon icon={faFileEdit} />
      </Button>
      <Button
        className="text-danger"
        variant="link"
        onClick={() => actions.removeGuest(id)}
      >
        <FontAwesomeIcon icon={faTrash} />
      </Button>
    </>
  );
};

export default Actions;
