import Actions from "./Actions";

const columnDefs = (actions) => [
  {
    field: "name",
  },
  {
    field: "phone",
  },
  {
    field: "email",
  },
  {
    headerName: "Nimto Type",
    field: "nimtoType",
  },
  {
    field: "passcode",
  },
  {
    headerName: "",
    cellRenderer: Actions,
    valueGetter: (params) => ({ guest: params.data, actions }),
  },
];

export default columnDefs;
