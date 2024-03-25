function countTrueValues(obj) {
  let count = 0;
  for (const key in obj) {
    if (obj[key] === true) {
      count++;
    }
  }
  return count;
}

const tableColumns = [
  {
    field: "ticket",
    headerName: "TICKET NO.",
    width: 150,
    headerClassName: "data-grid-header",
    editable: false,
    menu: false,
    option: false,
    sort: false,
    align: "center",
    headerAlign: "center",
    headerClassName: "data-grid-header",
  },
  {
    field: "doa",
    headerName: "DATE OF APPREHENSION",
    width: 200,
    headerClassName: "data-grid-header",
    editable: false,
  },
  {
    field: "cdl",
    headerName: "CONFISCATED D.L",
    width: 200,
    headerClassName: "data-grid-header",
    editable: false,
  },
  {
    field: "vname",
    headerName: "VIOLATOR'S NAME",
    width: 200,
    headerClassName: "data-grid-header",
    editable: false,
  },
  {
    field: "addressS",
    headerName: "ADDRESS",
    width: 100,
    headerClassName: "data-grid-header",
    editable: false,
  },
  {
    field: "typev",
    headerName: "TYPE OF VEHICLE",
    width: 200,
    headerClassName: "data-grid-header",
    editable: false,
  },
  {
    field: "tfn",
    headerName: "TRICYCLE FRANCHISE NO.",
    width: 200,
    headerClassName: "data-grid-header",
    editable: false,
  },
  {
    field: "platenoO",
    headerName: "PLATE NO.",
    width: 200,
    headerClassName: "data-grid-header",
    editable: false,
  },
  {
    field: "tov",
    headerName: "TIME OF VIOLATION",
    width: 200,
    headerClassName: "data-grid-header",
    editable: false,
  },
  {
    field: "pov",
    headerName: "PLACE OF VIOLATION",
    width: 280,
    headerClassName: "data-grid-header",
    editable: false,
  },
  {
    field: "vc",
    headerName: "VIOLATIONS COMMITTED",
    width: 200,
    headerClassName: "data-grid-header",
    editable: false,
  },
  {
    field: "ao",
    headerName: "APPREHENDING OFFICER",
    width: 200,
    headerClassName: "data-grid-header",
    editable: false,
  },
  {
    field: "orR",
    headerName: "O.R.",
    width: 200,
    headerClassName: "data-grid-header",
    editable: false,
  },
  {
    field: "ord",
    headerName: "O.R DATE",
    width: 200,
    headerClassName: "data-grid-header",
    editable: false,
  },
  {
    field: "amount",
    headerName: "AMOUNT",
    width: 150,
    headerClassName: "data-grid-header",
    editable: false,
  },
  {
    field: "remarksS",
    headerName: "REMARKS",
    width: 200,
    headerClassName: "data-grid-header",
    editable: false,
  },
];

export default { countTrueValues, tableColumns };
