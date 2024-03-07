import { Add } from "@mui/icons-material";
import { Box, Button, Divider, Grow, Paper, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { NavLink, Navigate, Outlet, useNavigate } from "react-router-dom";
import CreateClassModal from "./CreateClassModal";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useData from "../hooks/useData";
import SnackBar from "./SnackBar";
import emptyTable from "../assets/images/undraw_empty_re_opql.svg";
import EditClassModal from "./EditClassModal";
import { DataGrid } from "@mui/x-data-grid";
import ClientInfo from "./ClientInfo";
import AddClientModal from "./AddClientModal";

function sortByDate(array, datePropertyName) {
  return array.sort(
    (a, b) => new Date(a[datePropertyName]) - new Date(b[datePropertyName])
  );
}

const columns = [
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
    field: "toc2",
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
    width: 150,
    headerClassName: "data-grid-header",
    editable: false,
    align: "center",
    headerAlign: "center",
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
  const [pageSize, setPageSize] = useState(10);
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
    const client = rows.find((v) => v.id == id);
    setClientDetails(client);
    console.log(client);
  };

  const handleRowDoubleClick = (e) => {
    setClientInfo(true);
    getClientDetails(e.id);
  };

  return (
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

        <Box
          display="flex"
          alignItems="center"
          gap={2}
          sx={{ mb: { xs: 2, sm: 2, md: 0 } }}
        >
          <Button
            variant="contained"
            size="small"
            onClick={() => setClientInfo(true)}
            disableFocusRipple
          >
            <Add sx={{ color: "#FFF" }} />
            <Typography
              component={"span"}
              pr={1}
              variant="caption"
              color="#FFF"
            >
              Add Client
            </Typography>
          </Button>
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
                pageSize: 10,
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
    </Paper>
  );
};

export default ClientList;
