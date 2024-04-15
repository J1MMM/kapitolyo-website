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
import Vhelper from "./Vhelper";
import TableToolbar from "../../common/ui/TableToolbar";
import FilterButton from "../../common/ui/FilterButton";
import PaymentViolationsInfo from "./PaymentViolationInfo";
import useAuth from "../../../hooks/useAuth";
import ROLES_LIST from "../../common/data/ROLES_LIST";

const ViolationsTable = () => {
  document.title =
    "Violators Management | TRICYCLE FRANCHISING AND RENEWAL SYSTEM";

  const axiosPrivate = useAxiosPrivate();
  const { auth } = useAuth();
  const { violations, violationsLoading, violationsList } = useData();
  const [addViolatorOpen, setAddViolatorOpen] = useState(false);
  const [violationsInfoOpen, setViolationsInfoOpen] = useState(false);
  const [paymentViolationInfoOpen, setPaymentViolationInfoOpen] =
    useState(false);
  const [violationDetails, setViolationsDetails] = useState(
    Vhelper.initialDetails
  );
  const [initialViolationDetails, setInitialViolationsDetails] = useState(
    Vhelper.initialDetails
  );
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(100);
  const [totalRows, setTotalRows] = useState(0);

  const isCashier = Boolean(auth.roles?.find((v) => v == ROLES_LIST.Cashier));

  const handleDoubleClick = (e) => {
    let foundviolations = violations.find((v) => v._id == e.id);

    if (violationsList.length > 0) {
      foundviolations.violation = foundviolations.violation?.map((item1) => {
        const foundObject = violationsList?.find(
          (item2) => item2?._id === item1?._id
        );
        return foundObject;
      });
    }

    if (isCashier) {
      setPaymentViolationInfoOpen(true);
    } else {
      setViolationsInfoOpen(true);
    }

    setViolationsDetails(foundviolations);
    setInitialViolationsDetails(foundviolations);
  };

  return (
    <>
      <DataTable
        Toolbar={() => (
          <TableToolbar
            title="Violators"
            description="Record of violations committed"
            actionButtons={
              <>
                <FilterButton />
                <ContainedButton
                  title="add violator"
                  icon={<Add sx={{ color: "#FFF" }} />}
                  onClick={() => setAddViolatorOpen(true)}
                />
              </>
            }
          />
        )}
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

      <AddViolators open={addViolatorOpen} onClose={setAddViolatorOpen} />
      <PaymentViolationsInfo
        open={paymentViolationInfoOpen}
        onClose={setPaymentViolationInfoOpen}
        violationDetails={violationDetails}
        setViolationDetails={setViolationsDetails}
        initialViolationDetails={initialViolationDetails}
      />
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
