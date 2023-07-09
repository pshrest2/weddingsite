import { useState } from "react";
import { Button, Form } from "react-bootstrap";

const GuestForm = ({ onSubmit, guest }) => {
  const [currGuest, setCurrGuest] = useState(guest);

  const handleChange = (e) => {
    setCurrGuest((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const submitForm = (e) => {
    e.preventDefault();
    onSubmit(currGuest);
  };

  return (
    <Form onSubmit={submitForm}>
      <Form.Group className="mb-3">
        <Form.Label>Guest/Family Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter guest's name"
          name="name"
          value={currGuest.name}
          onChange={handleChange}
          required
        />
      </Form.Group>

      {/* <Form.Group className="mb-3">
        <Form.Label>Phone Number</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter guest's phone number"
          name="phone"
          value={currGuest.phone}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Email Address</Form.Label>
        <Form.Control
          type="email"
          placeholder="example@gmail.com"
          name="email"
          value={currGuest.email}
          onChange={handleChange}
        />
      </Form.Group> */}

      <Form.Group className="mb-3">
        <Form.Label>Nimto Type</Form.Label>
        <Form.Select
          name="nimtoType"
          value={currGuest.nimtoType}
          onChange={handleChange}
          required
        >
          <option>Select a nimto type</option>
          <option value="chuley_nimto">Chuley Nimto</option>
          <option value="sapariwar">Sapariwar</option>
          <option value="nimto">Nimto</option>
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Additional Info</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter any additional info here"
          name="additionalInfo"
          value={currGuest.additionalInfo}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group className="d-flex flex-row-reverse">
        <Button type="submit">Save</Button>
      </Form.Group>
    </Form>
  );
};
export default GuestForm;
