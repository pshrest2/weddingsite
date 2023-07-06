import React, { useState, useEffect, useCallback } from "react";
import { Form, Button, Container, Table } from "react-bootstrap";
import {
  createGuest,
  deleteGuest,
  getGuests,
  updateGuest,
} from "../../../api/apiCalls";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const initialValue = {
  name: "",
  email: "",
  phone: "",
  nimtoType: "",
  additionalInfo: "",
};

const Guests = () => {
  const { weddingId } = useParams();
  const [guests, setGuests] = useState([]);
  const [guest, setGuest] = useState(initialValue);

  const fetchGuests = useCallback(async () => {
    try {
      const result = await getGuests(weddingId);
      setGuests(result);
    } catch (errorResponse) {
      setGuests([]);
      toast.error(errorResponse.error);
    }
  }, [weddingId]);

  const submitForm = async (e) => {
    e.preventDefault();
    const prevGuests = [...guests];

    try {
      await createGuest(weddingId, guest);
      setGuests([...guests, guest]);
    } catch (errorResponse) {
      setGuests(prevGuests);
      toast.error(errorResponse.error);
    }
  };

  const removeGuest = async (id) => {
    const prevGuests = [...guests];
    try {
      await deleteGuest(weddingId, id);
      setGuests(guests.filter((guest) => guest.id !== id));
    } catch (errorResponse) {
      setGuests(prevGuests);
      toast.error(errorResponse.error);
    }
  };

  const handleChange = (e) => {
    setGuest((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    fetchGuests();
  }, [fetchGuests]);

  return (
    <Container>
      <h2>Atithi</h2>
      <Form onSubmit={submitForm}>
        <Form.Group className="mb-3">
          <Form.Label>Guest/Family Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter guest's name"
            name="name"
            value={guest.name}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter guest's phone number"
            name="phone"
            value={guest.phone}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="example@gmail.com"
            name="email"
            value={guest.email}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Nimto Type</Form.Label>
          <Form.Select
            name="nimtoType"
            value={guest.nimtoType}
            onChange={handleChange}
          >
            <option>Select a nimto type</option>
            <option value="chuley_nimto">Chuley Nimto</option>
            <option value="sapariwar">Sapariwar</option>
            <option value="nimto">Nimto</option>
          </Form.Select>
        </Form.Group>

        <Button variant="primary" type="submit">
          Add Guest
        </Button>
      </Form>

      <Table responsive hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {guests.map((guest) => (
            <tr key={guest.id}>
              <td>{guest.name}</td>
              <td>{guest.email}</td>
              <td>
                <button onClick={() => updateGuest(guest.id)}>Edit</button>
                <button onClick={() => removeGuest(guest.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};
export default Guests;
