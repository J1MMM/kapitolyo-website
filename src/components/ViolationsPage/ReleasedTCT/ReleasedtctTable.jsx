import { Add } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import ReleasedTCTInfo from "./ReleasedTCTInfo";
import useData from "../../../hooks/useData";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import TableLayout from "../../common/ui/TableLayout";
import ContainedButton from "../../common/ui/ContainedButton";
import helper from "../../common/data/helper";
import DataTable from "../../common/ui/DataTable";
import TableToolbar from "../../common/ui/TableToolbar";
import FilterButton from "../../common/ui/FilterButton";

const ReleasedtctTable = () => {
  document.title = "Released TCT | TRICYCLE FRANCHISING AND RENEWAL SYSTEM";

  const [snack, setSnack] = useState(false);
  const [severity, setSeverity] = useState("success");
  const [resMsg, setResMsg] = useState("");
  const [clientInfo, setClientInfo] = useState(false);
  const [releasedTCTInfo, setReleasedTCTInfo] = useState(false);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [totalRows, setTotalRows] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      <DataTable
        Toolbar={() => (
          <TableToolbar
            title="Released TCT"
            description="Manage all released TCT efficiently"
            actionButtons={
              <>
                <FilterButton />
                <ContainedButton
                  title="Add Ticket"
                  onClick={() => setReleasedTCTInfo(true)}
                  icon={<Add sx={{ color: "#FFF" }} />}
                />
              </>
            }
          />
        )}
        columns={helper.releasedTCTColumn}
        rows={[]}
        rowCount={totalRows}
        onFilterModelChange={() => setPage(0)}
        onPaginationModelChange={(e) => {
          setPage(e.page);
          setPageSize(e.pageSize);
        }}
        onStateChange={(e) =>
          setTotalRows(helper.countTrueValues(e?.visibleRowsLookup))
        }
        page={page}
        pageSize={pageSize}
      />

      <ReleasedTCTInfo
        open={releasedTCTInfo}
        onClose={setReleasedTCTInfo}
        setResMsg={setResMsg}
        setSeverity={setSeverity}
        setSnack={setSnack}
      />
    </>
  );
};

export default ReleasedtctTable;
