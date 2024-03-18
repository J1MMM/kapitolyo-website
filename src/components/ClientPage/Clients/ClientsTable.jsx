import { Add } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import useData from "../../../hooks/useData";
import ClientInfo from "./ClientInfo";
import TableLayout from "../../common/ui/TableLayout";
import helper from "../helper";
import ContainedButton from "../../common/ui/ContainedButton";
import DataTable from "../../common/ui/DataTable";
import AddFranchiseForm from "./AddFranchiseForm";
import { Box, Grow } from "@mui/material";

const ClientsTable = () => {
  const axiosPrivate = useAxiosPrivate();
  const { franchises, setFranchises, franchisesLoading } = useData();
  const [franchiseDetails, setFranchiseDetails] = useState(
    helper.initialFranchiseDetails
  );
  const [noResponse, setNoResponse] = useState(false);
  const [clientInfo, setClientInfo] = useState(false);
  const [addclient, setAddclient] = useState(false);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(50);
  const [totalRows, setTotalRows] = useState(0);
  const [isEmpty, setIsEmpty] = useState(false);

  const handleRowDoubleClick = (e) => {
    setClientInfo(true);
    const foundFranchise = franchises.find((v) => v.id == e.id);
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
        printable
      />

      <AddFranchiseForm open={addclient} onClose={setAddclient} />
    </Box>
  );
};

export default ClientsTable;
