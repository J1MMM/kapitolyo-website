import { Add } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import useData from "../../../hooks/useData";
import ClientInfo from "./ClientInfo";
import TableLayout from "../../common/ui/TableLayout";
import helper from "../helper";
import ContainedButton from "../../common/ui/ContainedButton";
import DataTable from "../../common/ui/DataTable";
import AddFranchiseForm from "./AddFranchiseForm";

const ClientsTable = () => {
  const axiosPrivate = useAxiosPrivate();
  const { franchises, setFranchises } = useData();
  const [clientDetails, setClientDetails] = useState();
  const [snack, setSnack] = useState(false);
  const [severity, setSeverity] = useState("success");
  const [resMsg, setResMsg] = useState("");
  const [noResponse, setNoResponse] = useState(false);
  const [clientInfo, setClientInfo] = useState(false);
  const [addclient, setAddclient] = useState(false);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(50);
  const [totalRows, setTotalRows] = useState(0);
  const [isEmpty, setIsEmpty] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosPrivate.get("/franchise");
        console.log(response.data.rows);
        if (response.data?.rows.length == 0) {
          setIsEmpty(true);
        }
        setTotalRows(response.data?.totalRows);
        setFranchises(() => {
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
              new Date(data["DATE RENEWAL"]),
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

    fetchData();
  }, []);

  const getClientDetails = (id) => {
    const foundClient = franchises.find((v) => v.id == id);
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
        subTitle="Efficiently monitor client status and details"
        button={
          <ContainedButton
            title="Add Client"
            onClick={() => setAddclient(true)}
            icon={<Add sx={{ color: "#FFF" }} />}
          />
        }
      >
        <DataTable
          columns={helper.clientsColumns}
          rows={franchises}
          rowCount={totalRows}
          page={page}
          pageSize={pageSize}
          onCellDoubleClick={(e) => handleRowDoubleClick(e)}
          onFilterModelChange={() => setPage(0)}
          onPaginationModelChange={(e) => {
            setPage(e.page);
            setPageSize(e.pageSize);
          }}
          onStateChange={(e) =>
            setTotalRows(helper.countTrueValues(e?.visibleRowsLookup))
          }
          loading={franchises.length == 0 && !isEmpty}
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

      <AddFranchiseForm
        open={addclient}
        onClose={setAddclient}
        setResMsg={setResMsg}
        setSeverity={setSeverity}
        setSnack={setSnack}
        printable={false}
      />
    </>
  );
};

export default ClientsTable;
