import { Add } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import useData from "../../../hooks/useData";
import TableLayout from "../../common/ui/TableLayout";
import ContainedButton from "../../common/ui/ContainedButton";
import DataTable from "../../common/ui/DataTable";
import AddViolators from "./AddViolatorForm";
import helper from "../../common/data/helper";
import ViolationInfo from "./ViolationInfo";

const initialDetails = {
  ticketNo: "",
  dateApprehension: null,
  confiscatedDL: "",
  name: "",
  address: "",
  typeVehicle: "",
  franchiseNo: "",
  plateNo: "",
  timeViolation: null,
  placeViolation: "",
  officer: null,
  violation: [],
  paid: false,
  remarks: "",
  amount: "",
  or: "",
  orDate: "",
};

const ViolationsTable = () => {
  document.title =
    "Violators Management | TRICYCLE FRANCHISING AND RENEWAL SYSTEM";

  const axiosPrivate = useAxiosPrivate();
  const { violations, violationsLoading } = useData();
  const [addViolatorOpen, setAddViolatorOpen] = useState(false);
  const [violationsInfoOpen, setViolationsInfoOpen] = useState(false);
  const [violationDetails, setViolationsDetails] = useState(initialDetails);
  const [initialViolationDetails, setInitialViolationsDetails] =
    useState(initialDetails);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [totalRows, setTotalRows] = useState(0);

  const handleDoubleClick = (e) => {
    const foundviolations = violations.find((v) => v._id == e.id);
    console.log(foundviolations);
    setViolationsDetails(foundviolations);
    setInitialViolationsDetails(foundviolations);
    setViolationsInfoOpen(true);
  };
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
          onCellDoubleClick={handleDoubleClick}
          onStateChange={(e) =>
            setTotalRows(helper.countTrueValues(e?.visibleRowsLookup))
          }
          loading={violationsLoading}
          page={page}
          pageSize={pageSize}
        />
      </TableLayout>

      <AddViolators open={addViolatorOpen} onClose={setAddViolatorOpen} />
      <ViolationInfo
        open={violationsInfoOpen}
        onClose={setViolationsInfoOpen}
        violationDetails={violationDetails}
        setViolationDetails={setViolationsDetails}
        initialViolationDetails={initialViolationDetails}
      />
    </>
  );
};

export default ViolationsTable;
