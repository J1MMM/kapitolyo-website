import React, { useEffect, useState } from "react";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import useData from "../../../hooks/useData";
import ClientInfo from "../Clients/ClientInfo";
import TableLayout from "../../common/ui/TableLayout";
import DataTable from "../../common/ui/DataTable";
import { Grow, Paper } from "@mui/material";
import dayjs from "dayjs";
import franchiseHelper from "../../common/data/franchiseHelper";

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
    franchiseHelper.initialFranchiseDetails
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
    console.log(foundFranchise);
    setFranchiseDetails({
      id: foundFranchise.id,
      mtop: foundFranchise.mtop,
      lname: foundFranchise.lname,
      fname: foundFranchise.fname,
      mi: foundFranchise.mi,
      address: foundFranchise.address,
      contact: foundFranchise.contact,
      contact2: foundFranchise.contact2,
      toda: foundFranchise.toda,
      drivername: foundFranchise.drivername,
      driveraddress: foundFranchise.driveraddress,
      or: foundFranchise.or,
      cr: foundFranchise.cr,
      driverlicenseno: foundFranchise.driverlicenseno,
      model: foundFranchise.model,
      motorno: foundFranchise.motorno,
      chassisno: foundFranchise.chassisno,
      plateno: foundFranchise.plateno,
      stroke: foundFranchise.stroke,
      date: foundFranchise.date,
      remarks: foundFranchise.remarks,
      daterelease: foundFranchise.daterelease,
      complaint: foundFranchise.complaint,
      tplDate1: foundFranchise.tplDate1,
      tplDate2: foundFranchise.tplDate2,
      typeofFranchise: foundFranchise.typeofFranchise,
      kindofBusiness: foundFranchise.kindofBusiness,
      route: foundFranchise.route,
      fuelDisp: foundFranchise.fuelDisp,
      ownerSex: foundFranchise.ownerSex,
      driverSex: foundFranchise.driverSex,
      tplProvider: foundFranchise.tplProvider,
      tplDate1: foundFranchise.tplDate1,
      tplDate2: foundFranchise.tplDate2,
      route: foundFranchise.route,
    });
  };

  return (
    <>
      <TableLayout
        title="Archived Clients"
        subTitle="Clients records you have archived"
      >
        <DataTable
          columns={[
            date_archived_column_format,
            ...franchiseHelper.clientsColumns,
          ]}
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
