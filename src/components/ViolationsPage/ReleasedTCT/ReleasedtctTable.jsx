import { Add } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import ReleasedTCTInfo from "./ReleasedTCTInfo";
import useData from "../../../hooks/useData";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import TableLayout from "../../common/ui/TableLayout";
import ContainedButton from "../../common/ui/ContainedButton";

const columns = [
  {
    field: "ticket",
    headerName: "TICKET NO.",
    width: 200,
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
    field: "tctno",
    headerName: "TCT NO. REALEASE",
    width: 300,
    headerClassName: "data-grid-header",
    editable: false,
  },
  {
    field: "lastname",
    headerName: "LAST NAME",
    width: 250,
    headerClassName: "data-grid-header",
    editable: false,
  },
  {
    field: "firstname",
    headerName: "FIRST NAME",
    width: 250,
    headerClassName: "data-grid-header",
    editable: false,
  },
  {
    field: "m.i",
    headerName: "M.I",
    width: 150,
    headerClassName: "data-grid-header",
    editable: false,
  },
  {
    field: "daterelease",
    headerName: "DATE OF RELEASE",
    width: 200,
    headerClassName: "data-grid-header",
    editable: false,
  },
];

const ReleasedtctTable = () => {
  const [snack, setSnack] = useState(false);
  const [severity, setSeverity] = useState("success");
  const [resMsg, setResMsg] = useState("");
  const [clientInfo, setClientInfo] = useState(false);
  const [releasedTCTInfo, setReleasedTCTInfo] = useState(false);
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
        title="Released TCT"
        subTitle="Manage all released TCT efficiently"
        button={
          <ContainedButton
            title="Add Ticket"
            onClick={() => setReleasedTCTInfo(true)}
            icon={<Add sx={{ color: "#FFF" }} />}
          />
        }
      >
        <DataGrid
          columns={columns}
          rows={[]}
          rowCount={totalRows}
          initialState={{
            pagination: {
              paginationModel: {
                page: 0,
                pageSize: 10,
              },
            },
          }}
          pageSizeOptions={[10, 50, 100]}
          onCellDoubleClick={() => setClientInfo(true)}
          paginationModel={{ page: page, pageSize: pageSize }}
          onFilterModelChange={() => setPage(0)}
          onPaginationModelChange={(e) => {
            setPage(e.page);
            setPageSize(e.pageSize);
          }}
          onStateChange={(e) =>
            setTotalRows(countTrueValues(e?.visibleRowsLookup))
          }
          disableRowSelectionOnClick
          showCellVerticalBorder
          sx={{
            boxSizing: "border-box",
            maxHeight: "70vh",
            height: "80vh",
            width: "100%",

            ".data-grid-header": {
              bgcolor: "#1A237E",
              color: "#FFF",
              ".MuiDataGrid-columnHeaderTitle": {
                fontWeight: "bold",
              },
              "&.MuiDataGrid-root": {
                border: "none",
                color: "#FFF",
              },
              ".MuiIconButton-sizeSmall": {
                color: "#FFF",
              },
            },
          }}
        />
      </TableLayout>

      <ReleasedTCTInfo
        open={releasedTCTInfo}
        onClose={setReleasedTCTInfo}
        setResMsg={setResMsg}
        setSeverity={setSeverity}
        setSnack={setSnack}
      />
    </>
  );
};

export default ReleasedtctTable;
