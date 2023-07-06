import { useState, useCallback, useRef } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { AgGridReact } from "ag-grid-react";

import columnDefs from "./columns";

import { createGuest, deleteGuest, getGuests } from "../../../api/apiCalls";

const initialValue = {
  name: "",
  email: "",
  phone: "",
  nimtoType: "",
  additionalInfo: "",
};

const Guests = () => {
  const gridApi = useRef();
  const { weddingId } = useParams();
  const [guests, setGuests] = useState([]);
  const [guest, setGuest] = useState(initialValue);

  const fetchGuests = useCallback(async () => {
    gridApi.current.api.showLoadingOverlay();
    try {
      const result = await getGuests(weddingId);
      setGuests(result);
    } catch (errorResponse) {
      setGuests([]);
      toast.error(errorResponse.error);
    }
  }, [weddingId]);

  const addGuest = async (e) => {
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

  const removeGuest = useCallback(
    async (id) => {
      console.log(id);

      const prevGuests = [...guests];
      try {
        await deleteGuest(weddingId, guest.id);
        setGuests(guests.filter((guest) => guest.id !== id));
      } catch (errorResponse) {
        setGuests(prevGuests);
        toast.error(errorResponse.error);
      }
    },
    [guest.id, guests, weddingId]
  );

  const handleChange = (e) => {
    setGuest((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const actions = {
    removeGuest,
  };

  return (
    <Container>
      <h2>Atithi</h2>
      <Form onSubmit={addGuest}>
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

      <div className="ag-theme-alpine my-3">
        <AgGridReact
          ref={gridApi}
          rowData={guests}
          columnDefs={columnDefs(actions)}
          domLayout="autoHeight"
          onGridReady={fetchGuests}
          onGridSizeChanged={({ api }) => api.sizeColumnsToFit()}
          suppressRowClickSelection
          suppressRowHoverHighlight
        />
      </div>
    </Container>
  );
};
export default Guests;
