import { Add } from "@mui/icons-material";
import { Box, Button, Grow, Paper, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useData from "../hooks/useData";
import { DataGrid } from "@mui/x-data-grid";
import ClientInfo from "./ClientInfo";
import AddClientModal from "./AddClientModal";

const columns = [
  {
    field: "mtopP",
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
    field: "lnameE",
    headerName: "LASTNAME",
    width: 200,
    headerClassName: "data-grid-header",
    editable: false,
  },
  {
    field: "fnameE",
    headerName: "FIRSTNAME",
    width: 200,
    headerClassName: "data-grid-header",
    editable: false,
  },
  {
    field: "miI",
    headerName: "MI",
    width: 100,
    headerClassName: "data-grid-header",
    editable: false,
  },
  {
    field: "addressS",
    headerName: "ADDRESS",
    width: 200,
    headerClassName: "data-grid-header",
    editable: false,
  },
  {
    field: "contactT",
    headerName: "CONTACT\u00a0NO.",
    width: 200,
    headerClassName: "data-grid-header",
    editable: false,
  },
  {
    field: "contact22",
    headerName: "CONTACT\u00a0NO.2",
    width: 200,
    headerClassName: "data-grid-header",
    editable: false,
  },
  {
    field: "toc22",
    headerName: "TODA",
    width: 200,
    headerClassName: "data-grid-header",
    editable: false,
  },
  {
    field: "drivernameE",
    headerName: "DRIVER'S\u00a0NAME",
    width: 280,
    headerClassName: "data-grid-header",
    editable: false,
  },
  {
    field: "driveraddressS",
    headerName: "DRIVER'S\u00a0ADDRESS",
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
    field: "crR",
    headerName: "C.R.",
    width: 200,
    headerClassName: "data-grid-header",
    editable: false,
  },
  {
    field: "driverlicensenoO",
    headerName: "DRIVER'S\u00a0LICENSE\u00a0NO.",
    width: 200,
    headerClassName: "data-grid-header",
    editable: false,
  },
  {
    field: "modelL",
    headerName: "MODEL",
    width: 150,
    headerClassName: "data-grid-header",
    editable: false,
  },
  {
    field: "motornoO",
    headerName: "MOTOR\u00a0NO.",
    width: 200,
    headerClassName: "data-grid-header",
    editable: false,
  },
  {
    field: "chassisnoO",
    headerName: "CHASSIS\u00a0NO.",
    width: 200,
    headerClassName: "data-grid-header",
    editable: false,
  },
  {
    field: "platenoO",
    headerName: "PLATE\u00a0NO.",
    width: 100,
    headerClassName: "data-grid-header",
    editable: false,
  },
  {
    field: "strokeO",
    headerName: "STROKE",
    width: 100,
    headerClassName: "data-grid-header",
    editable: false,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "dateE",
    headerName: "DATE RENEWAL",
    width: 150,
    headerClassName: "data-grid-header",
    editable: false,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "remarksS",
    headerName: "REMARKS",
    width: 250,
    headerClassName: "data-grid-header",
    editable: false,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "datereleaseE",
    headerName: "DATE\u00a0RELEASE\u00a0OF\u00a0ST/TP",
    width: 200,
    headerClassName: "data-grid-header",
    editable: false,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "complaintT",
    headerName: "COMPLAINT",
    width: 800,
    headerClassName: "data-grid-header",
    editable: false,
    align: "center",
    headerAlign: "center",
    headerColor: "red",
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

const ClientList = () => {
  const axiosPrivate = useAxiosPrivate();
  const { classes, rows, setRows } = useData();
  const [clientDetails, setClientDetails] = useState();

  const [section, setSection] = useState("");
  const [gradeLevel, setGradeLevel] = useState(1);
  const [schoolYear, setSchoolYear] = useState(new Date());

  const [snack, setSnack] = useState(false);
  const [severity, setSeverity] = useState("success");
  const [resMsg, setResMsg] = useState("");

  const [empty, setEmpty] = useState(false);
  const [noResponse, setNoResponse] = useState(false);
  const [clientInfo, setClientInfo] = useState(false);
  const [addClient, setAddClient] = useState(false);

  const [filterButtonEl, setFilterButtonEl] = useState(null);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(100);
  const [totalRows, setTotalRows] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (classes.length == 0) {
      setEmpty(true);
    } else {
      setEmpty(false);
    }
  }, [classes]);

  useEffect(() => {
    setIsLoading(true);

    const fetchData = async () => {
      try {
        const response = await axiosPrivate.get(`/franchise`);
        setTotalRows(response.data.totalRows);
        setRows(() => {
          return response.data.rows.map((data) => {
            return createData(
              data._id,
              data.MTOP,
              data.LASTNAME,
              data["FIRST NAME"],
              data.MI,
              data.ADDRESS,
              data["CONTACT NO."],
              data["CONTACT NO.2"],
              data["TO+C2+H1:H4"],
              data["DRIVER'S NAME"],
              data["DRIVER'S ADDRESS"],
              data["O.R."],
              data["C.R."],
              data["DRIVER'S LICENSE NO."],
              data["MODEL"],
              data["MOTOR NO."],
              data["CHASSIS NO."],
              data["PLATE NO"],
              data["STROKE"],
              data["DATE "],
              data["REMARKS"],
              data["DATE RELEASE OF ST/TP"],
              data["COMPLAINT"]
            );
          });
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    if (rows.length == 0) {
      fetchData();
    }
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

  const getClientDetails = (id) => {
    const foundClient = rows.find((v) => v.id == id);
    setClientDetails(foundClient);
    console.log(foundClient);
  };

  const handleRowDoubleClick = (e) => {
    setClientInfo(true);
    getClientDetails(e.id);
  };

  return (
    <>
      <Grow in={true}>
        <Paper
          elevation={0}
          sx={{
            p: 0,
            borderRadius: 3,
            minHeight: "calc(100vh-80px)",
            position: "relative",
            width: "100%",
            boxSizing: "border-box",
          }}
        >
          <Box
            bgcolor="#FFF"
            display="flex"
            justifyContent="space-between"
            pb={1}
            boxSizing="border-box"
            zIndex="99"
            sx={{
              flexDirection: {
                xs: "column",
                sm: "column",
                md: "row",
              },
              mb: {
                xs: 0,
                sm: 0,
                md: 0,
              },
            }}
          >
            <Box sx={{ mb: { xs: 1, sm: 1, md: 0 } }}>
              <Box display="flex" alignItems="center" gap={1} mb={-0.5}>
                <Typography component={"span"} variant="h5">
                  Clients Management
                </Typography>
              </Box>
              <Typography
                component={"span"}
                variant="caption"
                color="InactiveCaptionText"
              >
                Manage all clients efficiently
              </Typography>
            </Box>
          </Box>
          <Box display="flex" gap={3} flexWrap="wrap">
            <DataGrid
              ref={setFilterButtonEl}
              columns={columns}
              rows={rows}
              rowCount={totalRows}
              initialState={{
                pagination: {
                  paginationModel: {
                    page: 0,
                    pageSize: 100,
                  },
                },
              }}
              pageSizeOptions={[10, 50, 100]}
              onCellDoubleClick={(e) => handleRowDoubleClick(e)}
              paginationModel={{ page: page, pageSize: pageSize }}
              onFilterModelChange={() => setPage(0)}
              onPaginationModelChange={(e) => {
                setPage(e.page);
                setPageSize(e.pageSize);
              }}
              onStateChange={(e) =>
                setTotalRows(countTrueValues(e?.visibleRowsLookup))
              }
              loading={rows?.length == 0}
              disableRowSelectionOnClick
              showCellVerticalBorder
              sx={{
                boxSizing: "border-box",
                height: "70vh",
                maxHeight: "70vh",
                width: "100%",

                ".data-grid-header": {
                  bgcolor: "#150187",
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
          </Box>
        </Paper>
      </Grow>
      <ClientInfo
        open={clientInfo}
        onClose={setClientInfo}
        schoolYear={schoolYear}
        setSchoolYear={setSchoolYear}
        gradeLevel={gradeLevel}
        setGradeLevel={setGradeLevel}
        section={section}
        setSection={setSection}
        setResMsg={setResMsg}
        setSeverity={setSeverity}
        setSnack={setSnack}
        clientDetails={clientDetails}
      />

      <AddClientModal
        open={addClient}
        onClose={setAddClient}
        schoolYear={schoolYear}
        setSchoolYear={setSchoolYear}
        gradeLevel={gradeLevel}
        setGradeLevel={setGradeLevel}
        section={section}
        setSection={setSection}
        setResMsg={setResMsg}
        setSeverity={setSeverity}
        setSnack={setSnack}
      />
    </>
  );
};

export default ClientList;
