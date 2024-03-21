import dayjs from "dayjs";

const initialFranchiseDetails = {
  id: "",
  date: null,
  mtop: "",
  lname: "",
  fname: "",
  mi: "",
  address: "",
  ownerSex: "",
  driverSex: "",
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
    headerName: "CONTACT NO.",
    width: 200,
    headerClassName: "data-grid-header",
    editable: false,
    valueFormatter: (params) => params.value && `+63${params.value}`,
  },
  {
    field: "contact2",
    headerName: "CONTACT\u00a0NO.2",
    width: 200,
    headerClassName: "data-grid-header",
    editable: false,
    valueFormatter: (params) => params.value && `+63${params.value}`,
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
    valueFormatter: (params) =>
      params.value && dayjs(params.value).format("ddd, MMM D YYYY"),
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
    headerName: "DATE RELEASE OF ST/TP",
    width: 200,
    headerClassName: "data-grid-header",
    editable: false,
    align: "center",
    headerAlign: "center",
    valueFormatter: (params) =>
      params.value && dayjs(params.value).format("ddd, MMM D YYYY"),
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
  complaint,
  dateArchived,
  ownerSex,
  driverSex,
  tplProvider,
  tplDate1,
  tplDate2,
  fuelDisp,
  typeofFranchise,
  kindofBusiness,
  route
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
    dateArchived,
    ownerSex,
    driverSex,
    tplProvider,
    tplDate1,
    tplDate2,
    fuelDisp,
    typeofFranchise,
    kindofBusiness,
    route,
  };
}
function countTrueValues(obj) {
  let count = 0;
  for (const key in obj) {
    if (obj[key] === true) {
      count++;
    }
  }
  return count;
}

const checkedFormModified = (obj1, obj2) => {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) {
    return true;
  }
  for (let key of keys1) {
    if (!(key in obj2) || obj1[key] !== obj2[key]) {
      return true;
    }
  }

  return false;
};

const handleScrollToTop = () => {
  document
    .getElementById("client-info-content")
    .scrollTo({ top: 0, behavior: "smooth" });
};

const sortByMTOP = (array) => {
  return array.sort((a, b) => {
    const mtopA = parseInt(a.mtop);
    const mtopB = parseInt(b.mtop);
    if (mtopA < mtopB) {
      return -1; // 'a' comes before 'b'
    }
    if (mtopA > mtopB) {
      return 1; // 'b' comes before 'a'
    }
    return 0; // 'a' and 'b' are equal
  });
};

const formatFranchise = (franchise) => {
  return createClientsData(
    franchise._id,
    franchise.MTOP,
    franchise.LASTNAME,
    franchise.FIRSTNAME,
    franchise.MI,
    franchise.ADDRESS,
    franchise.OWNER_NO?.replace(/-/g, "").replace(/^0+/g, ""),
    franchise.DRIVERS_NO?.replace(/-/g, "").replace(/^0+/g, ""),
    franchise.TODA,
    franchise.DRIVERS_NAME,
    franchise.DRIVERS_ADDRESS,
    franchise.OR,
    franchise.CR,
    franchise.DRIVERS_LICENSE_NO,
    franchise.MODEL,
    franchise.MOTOR_NO,
    franchise.CHASSIS_NO,
    franchise.PLATE_NO,
    franchise.STROKE,
    franchise.DATE_RENEWAL && new Date(franchise.DATE_RENEWAL),
    franchise.REMARKS,
    franchise.DATE_RELEASE_OF_ST_TP &&
      new Date(franchise.DATE_RELEASE_OF_ST_TP),
    franchise.COMPLAINT,
    franchise.DATE_ARCHIVED,
    franchise.OWNER_SEX,
    franchise.DRIVERS_SEX,
    franchise.TPL_PROVIDER,
    franchise.TPL_DATE_1 && new Date(franchise.TPL_DATE_1),
    franchise.TPL_DATE_2 && new Date(franchise.TPL_DATE_2),
    franchise.FUEL_DISP,
    franchise.TYPE_OF_FRANCHISE,
    franchise.KIND_OF_BUSINESS,
    franchise.ROUTE
  );
};

export default {
  createClientsData,
  clientsColumns,
  countTrueValues,
  initialFranchiseDetails,
  checkedFormModified,
  handleScrollToTop,
  sortByMTOP,
  formatFranchise,
};
