import Actions from "./Actions";

const columnDefs = (actions) => [
  {
    headerName: "Guest Name",
    field: "name",
  },
  {
    headerName: "Phone",
    field: "phone",
  },
  {
    headerName: "Email",
    field: "email",
  },
  {
    headerName: "Nimto Type",
    field: "nimtoType",
  },
  {
    headerName: "",
    cellRenderer: Actions,
    valueGetter: (params) => ({ guest: params.data, actions }),
  },
];

export default columnDefs;
