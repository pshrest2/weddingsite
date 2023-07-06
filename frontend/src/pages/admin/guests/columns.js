import Actions from "./Actions";

const columnDefs = [
  {
    headerName: "Guest Name",
    field: "name",
    sortable: true,
    resizable: true,
    suppressMovable: true,
  },
  {
    headerName: "Phone",
    field: "phone",
    sortable: true,
    resizable: true,
    suppressMovable: true,
  },
  {
    headerName: "Email",
    field: "email",
    sortable: true,
    resizable: true,
    suppressMovable: true,
  },
  {
    headerName: "Nimto Type",
    field: "nimtoType",
    sortable: true,
    resizable: true,
    suppressMovable: true,
  },
  {
    headerName: "",
    cellRenderer: Actions,
    valueGetter: (params) => ({
      account: params.data,
    }),
  },
];

export default columnDefs;