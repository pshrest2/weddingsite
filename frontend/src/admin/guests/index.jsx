import React, { useState, useEffect, useCallback } from "react";
import {
  createGuest,
  deleteGuest,
  getGuests,
  updateGuest,
} from "../../api/apiCalls";
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
      await createGuest(weddingId, {
        body: JSON.stringify(guest),
      });
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
    <div>
      <h2>Atithi</h2>
      <form onSubmit={submitForm}>
        <input
          type="text"
          name="name"
          placeholder="Enter guest's name"
          value={guest.name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          placeholder="Enter guest's email"
          name="email"
          value={guest.email}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Enter guest's phone"
          name="phone"
          value={guest.phone}
          onChange={handleChange}
        />
        <button type="submit">Add Guest</button>
      </form>

      <table>
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
      </table>
    </div>
  );
};
export default Guests;
