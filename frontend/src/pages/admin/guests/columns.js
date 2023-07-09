import Actions from "./Actions";
import NimtoType from "./NimtoType";

const columnDefs = (actions) => [
  { field: "name" },
  {
    headerName: "Nimto Type",
    valueGetter: (params) => ({ nimtoType: params.data.nimtoType }),
    cellRenderer: NimtoType,
  },
  { field: "passcode" },
  { headerName: "Additional Info", field: "additionalInfo" },
  {
    headerName: "",
    cellRenderer: Actions,
    valueGetter: (params) => ({ guest: params.data, actions }),
  },
];

export default columnDefs;
