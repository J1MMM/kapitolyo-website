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
import ViolationsNavbar from "./ViolationsNavbar";
import ViolationsInfo from "./ViolationsInfo";
import ReleasedTCTInfo from "./ReleasedTCTinfo";

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
    field: "tctno",
    headerName: "TCT NO. REALEASE",
    width: 200,
    headerClassName: "data-grid-header",
    editable: false,
  },
  {
    field: "lastname",
    headerName: "LAST NAME",
    width: 200,
    headerClassName: "data-grid-header",
    editable: false,
  },
  {
    field: "firstname",
    headerName: "FIRST NAME",
    width: 200,
    headerClassName: "data-grid-header",
    editable: false,
  },
  {
    field: "m.i",
    headerName: "M.I",
    width: 100,
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

const ReleasedTCT = () => {
  const axiosPrivate = useAxiosPrivate();
  const { classes, rows, setRows } = useData();
  const [sortedClasses, setSortedClasses] = useState([]);
  const [createClassModal, setCreateClassModal] = useState(false);
  const [editClassModal, setEditClassModal] = useState(false);

  const [idToUpdate, setIdToUpdate] = useState("");
  const [updatedSection, setUpdatedSection] = useState("");
  const [updatedGradeLevel, setUpdatedGradeLevel] = useState(1);
  const [updatedSchoolYear, setUpdatedSchoolYear] = useState(new Date());

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
  const [violationsInfo, setViolationsInfo] = useState(false);
  const [releasedTCTInfo, setReleasedTCTInfo] = useState(false);

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

  // useEffect(() => {
  //     setSortedClasses(v => sortByDate(classes, 'schoolYear'))

  // }, [classes])

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
                    Released TCT Management
                  </Typography>
                </Box>
                <Typography
                  component={"span"}
                  variant="caption"
                  color="InactiveCaptionText"
                >
                  Manage all released TCT efficiently
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
                  onClick={() => setReleasedTCTInfo(true)}
                  disableFocusRipple
                >
                  <Add sx={{ color: "#FFF" }} />
                  <Typography
                    component={"span"}
                    pr={1}
                    variant="caption"
                    color="#FFF"
                  >
                    Add Ticket
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
                loading={rows?.length == 0}
                disableRowSelectionOnClick
                showCellVerticalBorder
                sx={{
                  boxSizing: "border-box",
                  maxHeight: "75vh",
                  height: "80vh",
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

            <ReleasedTCTInfo
              open={releasedTCTInfo}
              onClose={setReleasedTCTInfo}
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

export default ReleasedTCT;
