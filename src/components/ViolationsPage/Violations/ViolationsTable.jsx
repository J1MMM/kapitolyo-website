import { Add } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import useData from "../../../hooks/useData";
import TableLayout from "../../common/ui/TableLayout";
import ContainedButton from "../../common/ui/ContainedButton";
import DataTable from "../../common/ui/DataTable";
import AddViolators from "./AddViolatorForm";
import helper from "../../common/data/helper";

const ViolationsTable = () => {
  document.title =
    "Violators Management | TRICYCLE FRANCHISING AND RENEWAL SYSTEM";

  const axiosPrivate = useAxiosPrivate();
  const { violations, violationsLoading } = useData();
  const [addViolatorOpen, setAddViolatorOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [totalRows, setTotalRows] = useState(0);
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
          columns={helper.violationsTableColumns}
          rows={violations.map((data) => ({ ...data, id: data._id }))}
          rowCount={totalRows}
          onFilterModelChange={() => setPage(0)}
          onPaginationModelChange={(e) => {
            setPage(e.page);
            setPageSize(e.pageSize);
          }}
          onStateChange={(e) =>
            setTotalRows(helper.countTrueValues(e?.visibleRowsLookup))
          }
          loading={violationsLoading}
          page={page}
          pageSize={pageSize}
        />
      </TableLayout>

      <AddViolators open={addViolatorOpen} onClose={setAddViolatorOpen} />
    </>
  );
};

export default ViolationsTable;
