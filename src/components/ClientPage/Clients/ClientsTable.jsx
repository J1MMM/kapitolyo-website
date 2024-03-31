import { Add } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import useData from "../../../hooks/useData";
import ClientInfo from "./ClientInfo";
import TableLayout from "../../common/ui/TableLayout";

import ContainedButton from "../../common/ui/ContainedButton";
import DataTable from "../../common/ui/DataTable";
import AddFranchiseForm from "./AddFranchiseForm";
import { Box, Grow } from "@mui/material";
import helper from "../../common/data/helper";

const ClientsTable = () => {
  const axiosPrivate = useAxiosPrivate();
  const { franchises, setFranchises, franchisesLoading } = useData();
  const [franchiseDetails, setFranchiseDetails] = useState(
    helper.initialFranchiseDetails
  );
  const [initialFormInfo, setinitialFormInfo] = useState({});
  const [noResponse, setNoResponse] = useState(false);
  const [clientInfo, setClientInfo] = useState(false);
  const [addclient, setAddclient] = useState(false);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(50);
  const [totalRows, setTotalRows] = useState(0);

  const handleRowDoubleClick = (e) => {
    setClientInfo(true);
    let foundFranchise = franchises.find((v) => v.id == e.id);

    setFranchiseDetails(foundFranchise);
    setinitialFormInfo(foundFranchise);
  };

  return (
    <Box>
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
          loading={franchisesLoading}
        />
      </TableLayout>

      <ClientInfo
        open={clientInfo}
        onClose={setClientInfo}
        franchiseDetails={franchiseDetails}
        setFranchiseDetails={setFranchiseDetails}
        initialFormInfo={initialFormInfo}
        printable
      />

      <AddFranchiseForm open={addclient} onClose={setAddclient} />
    </Box>
  );
};

export default ClientsTable;
