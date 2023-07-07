import { useState, useCallback, useRef } from "react";
import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { AgGridReact } from "ag-grid-react";

import columnDefs from "./columns";

import { createGuest, deleteGuest, getGuests } from "../../../api/apiCalls";
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
    } catch (errorResponse) {
      setGuests([]);
      toast.error(errorResponse.error);
    }
  }, [weddingId]);

  const addGuest = async (guest) => {
    try {
      const newGuest = await createGuest(weddingId, guest);
      setGuests([...guests, newGuest]);
    } catch (errorResponse) {
      toast.error(errorResponse.error);
    }
  };

  const removeGuest = useCallback(
    async (id) => {
      const prevGuests = [...guests];
      try {
        await deleteGuest(weddingId, id);
        setGuests(guests.filter((guest) => guest.id !== id));
      } catch (errorResponse) {
        setGuests(prevGuests);
        toast.error(errorResponse.error);
      }
    },
    [guests, weddingId]
  );

  const actions = {
    removeGuest,
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
