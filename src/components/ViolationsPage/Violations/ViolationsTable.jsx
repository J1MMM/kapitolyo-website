import { Add } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import useData from "../../../hooks/useData";
import TableLayout from "../../common/ui/TableLayout";
import ContainedButton from "../../common/ui/ContainedButton";
import DataTable from "../../common/ui/DataTable";
import AddViolators from "./AddViolatorForm";
import violationsHelper from "../../common/data/violationsHelper";

const ViolationsTable = () => {
  document.title =
    "Violators Management | TRICYCLE FRANCHISING AND RENEWAL SYSTEM";

  const axiosPrivate = useAxiosPrivate();
  const [snack, setSnack] = useState(false);
  const [severity, setSeverity] = useState("success");
  const [resMsg, setResMsg] = useState("");
  const [empty, setEmpty] = useState(false);
  const [noResponse, setNoResponse] = useState(false);
  const [clientInfo, setClientInfo] = useState(false);
  const [addViolatorOpen, setAddViolatorOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [totalRows, setTotalRows] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      <TableLayout
        title="Violators"
        subTitle="Record of violations committed"
        button={
          <ContainedButton
            title="add violator"
            icon={<Add sx={{ color: "#FFF" }} />}
            onClick={() => setAddViolatorOpen(true)}
          />
        }
      >
        <DataTable
          columns={violationsHelper.tableColumns}
          rows={[]}
          rowCount={totalRows}
          onCellDoubleClick={() => setClientInfo(true)}
          onFilterModelChange={() => setPage(0)}
          onPaginationModelChange={(e) => {
            setPage(e.page);
            setPageSize(e.pageSize);
          }}
          onStateChange={(e) =>
            setTotalRows(violationsHelper.countTrueValues(e?.visibleRowsLookup))
          }
          loading={false}
          page={page}
          pageSize={pageSize}
        />
      </TableLayout>

      <AddViolators open={addViolatorOpen} onClose={setAddViolatorOpen} />
    </>
  );
};

export default ViolationsTable;
