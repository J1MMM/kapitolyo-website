import { Add, Filter, FilterAlt, FilterList } from "@mui/icons-material";
import React, { memo, useEffect, useRef, useState } from "react";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import useData from "../../../hooks/useData";
import ClientInfo from "./ClientInfo";
import TableLayout from "../../common/ui/TableLayout";

import ContainedButton from "../../common/ui/ContainedButton";
import DataTable from "../../common/ui/DataTable";
import AddFranchiseForm from "./AddFranchiseForm";
import { Box, Button, Grow, Stack, Typography } from "@mui/material";
import helper from "../../common/data/helper";
import { makeStyles } from "@mui/styles";
import {
  GridPreferencePanelsValue,
  GridToolbar,
  GridToolbarContainer,
  GridToolbarFilterButton,
  GridToolbarQuickFilter,
  gridPreferencePanelStateSelector,
  useGridApiContext,
} from "@mui/x-data-grid";
import TableToolbar from "../../common/ui/TableToolbar";
import OutlinedButton from "../../common/ui/OutlinedButton";
import FilterButton from "../../common/ui/FilterButton";

const useStyles = makeStyles({
  highlightedRow: {
    backgroundColor: "#FFCCCC", // Change this to the desired color
    "&:hover": {
      backgroundColor: "#FFB2B2 !important", // Change this to the desired hover color
    },
  },
});

const ClientsTable = memo(() => {
  const classes = useStyles();
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
  const [pageSize, setPageSize] = useState(100);
  const [totalRows, setTotalRows] = useState(0);

  const handleRowDoubleClick = (e) => {
    setClientInfo(true);
    let foundFranchise = franchises.find((v) => v.id == e.id);

    setFranchiseDetails(foundFranchise);
    setinitialFormInfo(foundFranchise);
  };

  const getRowClassName = (params) => {
    const nonEmptyLength = params.row.complaint?.filter(
      (str) => str?.trim() !== ""
    )?.length;
    if (nonEmptyLength >= 4) {
      return classes.highlightedRow;
    }
    return ""; // Return an empty string for rows without highlighting
  };

  return (
    <>
      <DataTable
        Toolbar={() => (
          <TableToolbar
            title="Clients Management"
            description="Efficiently monitor client status and details"
            actionButtons={
              <>
                <FilterButton />
                <ContainedButton
                  title="Add Client"
                  icon={<Add sx={{ color: "#FFF" }} />}
                  onClick={() => setAddclient(true)}
                />
              </>
            }
          />
        )}
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
        getRowClassName={getRowClassName}
      />

      <ClientInfo
        open={clientInfo}
        onClose={setClientInfo}
        franchiseDetails={franchiseDetails}
        setFranchiseDetails={setFranchiseDetails}
        initialFormInfo={initialFormInfo}
        printable
      />

      <AddFranchiseForm open={addclient} onClose={setAddclient} />
    </>
  );
});

export default ClientsTable;
