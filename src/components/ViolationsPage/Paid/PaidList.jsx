import { Box, Button, Divider, Grow, Paper, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import useData from "../../../hooks/useData";
import TableLayout from "../../common/ui/TableLayout";
import DataTable from "../../common/ui/DataTable";

function sortByDate(array, datePropertyName) {
  return array.sort(
    (a, b) => new Date(a[datePropertyName]) - new Date(b[datePropertyName])
  );
}

const columns = [
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

function createData(
  id,
  mtop,
  lname,
  fname,
  mi,
  address,
  contact,
  contact2,
  toc2,
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
    toc2,
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

const PaidTable = () => {
  document.title = "Paid List | TRICYCLE FRANCHISING AND RENEWAL SYSTEM";
  const axiosPrivate = useAxiosPrivate();

  const [snack, setSnack] = useState(false);
  const [severity, setSeverity] = useState("success");
  const [resMsg, setResMsg] = useState("");

  const [noResponse, setNoResponse] = useState(false);
  const [clientInfo, setClientInfo] = useState(false);
  const [violationsInfo, setViolationsInfo] = useState(false);

  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [totalRows, setTotalRows] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);

    const fetchData = async () => {};
    fetchData();
    setIsLoading(false);
  }, []);

  function countTrueValues(obj) {
    let count = 0;
    for (const key in obj) {
      if (obj[key] === true) {
        count++;
      }
    }
    return count;
  }

  return (
    <>
      <TableLayout
        title="Paid List"
        subTitle="Manage all paid clients efficiently"
      >
        <DataTable
          columns={columns}
          rows={[]}
          rowCount={totalRows}
          page={page}
          pageSize={pageSize}
          onCellDoubleClick={() => setClientInfo(true)}
          onFilterModelChange={() => setPage(0)}
          onPaginationModelChange={(e) => {
            setPage(e.page);
            setPageSize(e.pageSize);
          }}
          onStateChange={(e) =>
            setTotalRows(countTrueValues(e?.visibleRowsLookup))
          }
          loading={false}
        />
      </TableLayout>
    </>
  );
};

export default PaidTable;
