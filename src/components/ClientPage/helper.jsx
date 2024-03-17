import dayjs from "dayjs";

const initialFranchiseDetails = {
  id: "",
  date: new Date(),
  mtop: "",
  lname: "",
  fname: "",
  mi: "",
  address: "",
  contact: "",
  contact2: "",
  toda: "",
  drivername: "",
  driveraddress: "",
  or: "",
  cr: "",
  driverlicenseno: "",
  model: "",
  motorno: "",
  chassisno: "",
  plateno: "",
  stroke: "",
  remarks: "",
  daterelease: null,
  complaint: "",
  tplDate1: null,
  tplDate2: null,
  typeofFranchise: "",
  kindofBusiness: "",
  fuelDisp: "",
  tplProvider: "",
  route: "",
};

function createClientsData(
  id,
  mtop,
  lname,
  fname,
  mi,
  address,
  contact,
  contact2,
  toda,
  drivername,
  driveraddress,
  or,
  cr,
  driverlicenseno,
  model,
  motorno,
  chassisno,
  plateno,
  stroke,
  date,
  remarks,
  daterelease,
  complaint
) {
  return {
    id,
    mtop,
    lname,
    fname,
    mi,
    address,
    contact,
    contact2,
    toda,
    drivername,
    driveraddress,
    or,
    cr,
    driverlicenseno,
    model,
    motorno,
    chassisno,
    plateno,
    stroke,
    date,
    remarks,
    daterelease,
    complaint,
  };
}

const clientsColumns = [
  {
    field: "mtop",
    headerName: "MTOP",
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
    field: "lname",
    headerName: "LASTNAME",
    width: 200,
    headerClassName: "data-grid-header",
    editable: false,
  },
  {
    field: "fname",
    headerName: "FIRSTNAME",
    width: 200,
    headerClassName: "data-grid-header",
    editable: false,
  },
  {
    field: "mi",
    headerName: "MI",
    width: 100,
    headerClassName: "data-grid-header",
    editable: false,
  },
  {
    field: "address",
    headerName: "ADDRESS",
    width: 200,
    headerClassName: "data-grid-header",
    editable: false,
  },
  {
    field: "contact",
    headerName: "CONTACT\u00a0NO.",
    width: 200,
    headerClassName: "data-grid-header",
    editable: false,
  },
  {
    field: "contact2",
    headerName: "CONTACT\u00a0NO.2",
    width: 200,
    headerClassName: "data-grid-header",
    editable: false,
  },
  {
    field: "toda",
    headerName: "TODA",
    width: 200,
    headerClassName: "data-grid-header",
    editable: false,
  },
  {
    field: "drivername",
    headerName: "DRIVER'S\u00a0NAME",
    width: 280,
    headerClassName: "data-grid-header",
    editable: false,
  },
  {
    field: "driveraddress",
    headerName: "DRIVER'S\u00a0ADDRESS",
    width: 200,
    headerClassName: "data-grid-header",
    editable: false,
  },
  {
    field: "or",
    headerName: "O.R.",
    width: 200,
    headerClassName: "data-grid-header",
    editable: false,
  },
  {
    field: "cr",
    headerName: "C.R.",
    width: 200,
    headerClassName: "data-grid-header",
    editable: false,
  },
  {
    field: "driverlicenseno",
    headerName: "DRIVER'S\u00a0LICENSE\u00a0NO.",
    width: 200,
    headerClassName: "data-grid-header",
    editable: false,
  },
  {
    field: "model",
    headerName: "MODEL",
    width: 150,
    headerClassName: "data-grid-header",
    editable: false,
  },
  {
    field: "motorno",
    headerName: "MOTOR\u00a0NO.",
    width: 200,
    headerClassName: "data-grid-header",
    editable: false,
  },
  {
    field: "chassisno",
    headerName: "CHASSIS\u00a0NO.",
    width: 200,
    headerClassName: "data-grid-header",
    editable: false,
  },
  {
    field: "plateno",
    headerName: "PLATE\u00a0NO.",
    width: 100,
    headerClassName: "data-grid-header",
    editable: false,
  },
  {
    field: "stroke",
    headerName: "STROKE",
    width: 100,
    headerClassName: "data-grid-header",
    editable: false,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "date",
    headerName: "DATE RENEWAL",
    width: 200,
    headerClassName: "data-grid-header",
    editable: false,
    align: "center",
    headerAlign: "center",
    valueFormatter: (params) => dayjs(params.value).format("ddd, MMM D YYYY"),
  },
  {
    field: "remarks",
    headerName: "REMARKS",
    width: 250,
    headerClassName: "data-grid-header",
    editable: false,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "daterelease",
    headerName: "DATE\u00a0RELEASE\u00a0OF\u00a0ST/TP",
    width: 200,
    headerClassName: "data-grid-header",
    editable: false,
    align: "center",
    headerAlign: "center",
    valueFormatter: (params) =>
      params.value ? dayjs(params.value).format("ddd, MMM D YYYY") : null,
  },
  {
    field: "complaint",
    headerName: "COMPLAINT",
    width: 800,
    headerClassName: "data-grid-header",
    editable: false,
    align: "center",
    headerAlign: "center",
    headerColor: "red",
  },
];

function countTrueValues(obj) {
  let count = 0;
  for (const key in obj) {
    if (obj[key] === true) {
      count++;
    }
  }
  return count;
}

function parseCustomDate(dateString) {
  // Split the date string into its components
  const [month, day, year] = dateString.split("/");

  // Determine the century based on the current year
  const currentYear = new Date().getFullYear();
  const centuryPrefix = currentYear.toString().slice(0, 2);

  // Construct a new date object with the parsed components
  const fullYear = centuryPrefix + year;
  const dateObject = new Date(`${month}/${day}/${fullYear}`);

  return dateObject;
}

export default {
  createClientsData,
  clientsColumns,
  countTrueValues,
  parseCustomDate,
  initialFranchiseDetails,
};
