import { Add } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import useData from "../../../hooks/useData";
import { DataGrid } from "@mui/x-data-grid";
import ClientInfo from "./ClientInfo";
import AddClientForm from "./AddClientForm";
import TableLayout from "../../common/ui/TableLayout";
import helper from "../helper";
import ContainedButton from "../../common/ui/ContainedButton";

const ClientsTable = () => {
  const axiosPrivate = useAxiosPrivate();
  const { rows, setRows } = useData();
  const [clientDetails, setClientDetails] = useState();
  const [snack, setSnack] = useState(false);
  const [severity, setSeverity] = useState("success");
  const [resMsg, setResMsg] = useState("");
  const [empty, setEmpty] = useState(false);
  const [noResponse, setNoResponse] = useState(false);
  const [clientInfo, setClientInfo] = useState(false);
  const [addclient, setAddclient] = useState(false);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(100);
  const [totalRows, setTotalRows] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const response = await axiosPrivate.get(`/franchise`);
        setTotalRows(response.data?.totalRows);
        setRows(() => {
          return response.data?.rows.map((data) => {
            return helper.createClientsData(
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

  const getClientDetails = (id) => {
    const foundClient = rows.find((v) => v.id == id);
    setClientDetails(foundClient);
  };

  const handleRowDoubleClick = (e) => {
    setClientInfo(true);
    getClientDetails(e.id);
  };

  return (
    <>
      <TableLayout
        title="Clients Management"
        subTitle="Manage all clients efficiently"
        button={
          <ContainedButton
            title="Add Client"
            onClick={() => setAddclient(true)}
            icon={<Add sx={{ color: "#FFF" }} />} />
        }
      >
        <DataGrid
          columns={helper.clientsColumns}
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
            setTotalRows(helper.countTrueValues(e?.visibleRowsLookup))
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
      </TableLayout>

      <ClientInfo
        open={clientInfo}
        onClose={setClientInfo}
        setResMsg={setResMsg}
        setSeverity={setSeverity}
        setSnack={setSnack}
        clientDetails={clientDetails}
      />

      <AddClientForm
        open={addclient}
        onClose={setAddclient}
        setResMsg={setResMsg}
        setSeverity={setSeverity}
        setSnack={setSnack}
      />
    </>
  );
};

export default ClientsTable;
