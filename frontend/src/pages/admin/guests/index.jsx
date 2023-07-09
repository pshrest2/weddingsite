import { useState, useCallback, useRef } from "react";
import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { AgGridReact } from "ag-grid-react";

import columnDefs from "./columns";

import {
  createGuest,
  deleteGuest,
  getGuests,
  updateGuest,
} from "../../../api/apiCalls";
import GuestForm from "./GuestForm";

const initialValue = {
  name: "",
  email: "",
  phone: "",
  nimtoType: "",
  additionalInfo: "",
  passcode: "",
};

const defaultColDef = {
  sortable: true,
  resizable: true,
  suppressMovable: true,
};

const Guests = () => {
  const gridApi = useRef();
  const { weddingId } = useParams();
  const [guests, setGuests] = useState([]);

  const fetchGuests = useCallback(async () => {
    gridApi.current.api.showLoadingOverlay();
    try {
      const result = await getGuests(weddingId);
      setGuests(result);
    } catch (error) {
      setGuests([]);
      toast.error(error);
    }
  }, [weddingId]);

  const addGuest = useCallback(
    async (guest) => {
      try {
        const newGuest = await createGuest(weddingId, guest);
        setGuests([...guests, newGuest]);
      } catch (error) {
        toast.error(error);
      }
    },
    [guests, weddingId]
  );

  const editGuest = useCallback(
    async (guest) => {
      try {
        const updatedGuest = await updateGuest(weddingId, guest.id, guest);
        setGuests((prev) => {
          const newGuests = [...prev];
          const index = guests.findIndex((g) => g.id === guest.id);

          newGuests[index] = updatedGuest;
          return newGuests;
        });
      } catch (error) {
        toast.error(error);
      }
    },
    [guests, weddingId]
  );

  const removeGuest = useCallback(
    async (id) => {
      const prevGuests = [...guests];
      try {
        await deleteGuest(weddingId, id);
        setGuests(guests.filter((guest) => guest.id !== id));
      } catch (error) {
        setGuests(prevGuests);
        toast.error(error);
      }
    },
    [guests, weddingId]
  );

  const actions = {
    removeGuest,
    editGuest,
  };

  return (
    <Container>
      <h2>Atithi</h2>
      <GuestForm onSubmit={addGuest} guest={initialValue} />

      <div className="ag-theme-alpine my-3">
        <AgGridReact
          ref={gridApi}
          rowData={guests}
          columnDefs={columnDefs(actions)}
          defaultColDef={defaultColDef}
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
