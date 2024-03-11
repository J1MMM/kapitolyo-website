import React, { useEffect, useState } from "react";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import useData from "../../../hooks/useData";
import ClientInfo from "../Clients/ClientInfo";
import TableLayout from "../../common/ui/TableLayout";
import DataTable from "../../common/ui/DataTable";
import Helper from "../helper";

const ClientArchived = () => {
  const axiosPrivate = useAxiosPrivate();
  const { rows } = useData();
  const [clientDetails, setClientDetails] = useState();

  const [snack, setSnack] = useState(false);
  const [severity, setSeverity] = useState("success");
  const [resMsg, setResMsg] = useState("");

  const [noResponse, setNoResponse] = useState(false);
  const [clientInfo, setClientInfo] = useState(false);

  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(50);
  const [totalRows, setTotalRows] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);

    const fetchData = async () => {};
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
      <TableLayout
        title="Archived Clients"
        subTitle="Clients records you have archived"
      >
        <DataTable
          columns={Helper.clientsColumns}
          rows={[]}
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
          loading={false}
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
      />
    </>
  );
};

export default ClientArchived;
