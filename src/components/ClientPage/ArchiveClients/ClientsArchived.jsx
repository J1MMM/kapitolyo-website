import React, { useEffect, useState } from "react";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import useData from "../../../hooks/useData";
import ClientInfo from "../Clients/ClientInfo";
import TableLayout from "../../common/ui/TableLayout";
import DataTable from "../../common/ui/DataTable";
import Helper from "../helper";

const ClientArchived = () => {
  const axiosPrivate = useAxiosPrivate();
  const { archivedFranchises, setArchivedFranchises } = useData();
  const [clientDetails, setClientDetails] = useState();

  const [snack, setSnack] = useState(false);
  const [severity, setSeverity] = useState("success");
  const [resMsg, setResMsg] = useState("");

  const [isEmpty, setIsEmpty] = useState(false);
  const [noResponse, setNoResponse] = useState(false);
  const [clientInfo, setClientInfo] = useState(false);

  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(50);
  const [totalRows, setTotalRows] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosPrivate.get("/franchise/archive");
        console.log(response.data.rows);
        if (response.data?.rows.length == 0) {
          setIsEmpty(true);
        }
        setTotalRows(response.data?.totalRows);
        setArchivedFranchises(() => {
          return response.data?.rows.map((data) => {
            return Helper.createClientsData(
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
    const foundClient = archivedFranchises.find((v) => v.id == id);
    setClientDetails(foundClient);
    console.log(foundClient);
  };

  const handleRowDoubleClick = (e) => {
    setClientInfo(true);
    getClientDetails(e.id);
  };

  return (
    <>
      <TableLayout
        title="Archived Clients"
        subTitle="Clients records you have archived"
      >
        <DataTable
          columns={Helper.clientsColumns}
          rows={archivedFranchises}
          rowCount={totalRows}
          onCellDoubleClick={(e) => handleRowDoubleClick(e)}
          onFilterModelChange={() => setPage(0)}
          onPaginationModelChange={(e) => {
            setPage(e.page);
            setPageSize(e.pageSize);
          }}
          onStateChange={(e) =>
            setTotalRows(countTrueValues(e?.visibleRowsLookup))
          }
          loading={archivedFranchises.length == 0 && !isEmpty}
          page={page}
          pageSize={pageSize}
        />
      </TableLayout>

      <ClientInfo
        open={clientInfo}
        onClose={setClientInfo}
        setResMsg={setResMsg}
        setSeverity={setSeverity}
        setSnack={setSnack}
        clientDetails={clientDetails}
        archiveMode={true}
        printable={false}
      />
    </>
  );
};

export default ClientArchived;
