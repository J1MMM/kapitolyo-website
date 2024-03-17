import React, { useEffect, useState } from "react";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import useData from "../../../hooks/useData";
import ClientInfo from "../Clients/ClientInfo";
import TableLayout from "../../common/ui/TableLayout";
import DataTable from "../../common/ui/DataTable";
import Helper from "../helper";

const ClientArchived = () => {
  const axiosPrivate = useAxiosPrivate();
  const { archivedFranchises, setArchivedFranchises } = useData();
  const [franchiseDetails, setFranchiseDetails] = useState(
    Helper.initialFranchiseDetails
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
    });
  };

  return (
    <>
      <TableLayout
        title="Archived Clients"
        subTitle="Clients records you have archived"
      >
        <DataTable
          columns={Helper.clientsColumns}
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
          loading={archivedFranchises.length == 0 && !isEmpty}
          page={page}
          pageSize={pageSize}
        />
      </TableLayout>

      <ClientInfo
        open={clientInfo}
        onClose={setClientInfo}
        franchiseDetails={franchiseDetails}
        archiveMode={true}
      />
    </>
  );
};

export default ClientArchived;
