import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";

const PasscodeModal = ({ show, onSubmit }) => {
  const [passcode, setPasscode] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(passcode);
  };

  return (
    <Modal show={show}>
      <Modal.Header>
        <Modal.Title>Enter your passcode</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="my-3">
            <Form.Control
              type="text"
              placeholder="Enter 4 digit passcode from the invitation card"
              value={passcode}
              onChange={(e) => setPasscode(e.target.value)}
            />
          </Form.Group>

          <div className="d-flex flex-row-reverse">
            <Button type="submit">Submit</Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default PasscodeModal;
