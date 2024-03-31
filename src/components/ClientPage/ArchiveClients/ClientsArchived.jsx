import React, { useEffect, useState } from "react";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import useData from "../../../hooks/useData";
import ClientInfo from "../Clients/ClientInfo";
import TableLayout from "../../common/ui/TableLayout";
import DataTable from "../../common/ui/DataTable";
import { Grow, Paper } from "@mui/material";
import dayjs from "dayjs";
import helper from "../../common/data/helper";

const date_archived_column_format = {
  field: "dateArchived",
  headerName: "Date Archived",
  width: 200,
  headerClassName: "data-grid-header",
  editable: false,
  menu: false,
  option: false,
  sort: false,
  align: "center",
  headerAlign: "center",
  headerClassName: "data-grid-header",
  valueFormatter: (params) =>
    params.value ? dayjs(params.value).format("ddd, MMM D YYYY") : null,
};

const ClientArchived = () => {
  document.title =
    "Archived Management | TRICYCLE FRANCHISING AND RENEWAL SYSTEM";
  const axiosPrivate = useAxiosPrivate();
  const {
    archivedFranchises,
    setArchivedFranchises,
    archivedFranchisesLoading,
  } = useData();
  const [franchiseDetails, setFranchiseDetails] = useState(
    helper.initialFranchiseDetails
  );

  const [isEmpty, setIsEmpty] = useState(false);
  const [noResponse, setNoResponse] = useState(false);
  const [clientInfo, setClientInfo] = useState(false);

  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(50);
  const [totalRows, setTotalRows] = useState(0);

  function countTrueValues(obj) {
    let count = 0;
    for (const key in obj) {
      if (obj[key] === true) {
        count++;
      }
    }
    return count;
  }

  const handleRowDoubleClick = (e) => {
    setClientInfo(true);
    const foundFranchise = archivedFranchises.find((v) => v.id == e.id);
    setFranchiseDetails(foundFranchise);
  };

  return (
    <>
      <TableLayout
        title="Archived Clients"
        subTitle="Clients records you have archived"
      >
        <DataTable
          columns={[date_archived_column_format, ...helper.clientsColumns]}
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
          loading={archivedFranchisesLoading}
          page={page}
          pageSize={pageSize}
        />
      </TableLayout>

      <ClientInfo
        open={clientInfo}
        setFranchiseDetails={setFranchiseDetails}
        onClose={setClientInfo}
        franchiseDetails={franchiseDetails}
        archiveMode={true}
      />
    </>
  );
};

export default ClientArchived;
