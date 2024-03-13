import { Box, Button, FormControl, Typography } from "@mui/material";
import React, { useState } from "react";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import useData from "../../../hooks/useData";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import OutlinedTextField from "../../common/ui/OutlinedTextField";
import FlexRow from "../../common/ui/FlexRow";
import Fieldset from "../../common/ui/Fieldset";
import DialogForm from "../../common/ui/DialogForm";
import ConfirmationDialog from "../../common/ui/ConfirmationDialog";
import helper from "../helper";

const ClientInfo = ({ open, onClose, clientDetails, archiveMode }) => {
  const axiosPrivate = useAxiosPrivate();
  const [disable, setDisable] = useState(false);
  const [dropConfirm, setDropConfirm] = useState(false);
  const { setFranchises, setArchivedFranchises, setAvailableMTOP } = useData();

  const handleFranchiseRevoke = async () => {
    setDisable(true);
    const id = clientDetails?.id;
    try {
      const response = await axiosPrivate.patch("/franchise", { id });
      console.log(response.data);
      if (response.data) {
        setFranchises((prev) => prev.filter((franchise) => franchise.id != id));
        setAvailableMTOP((prev) => [...prev, clientDetails?.mtop]);
        setDropConfirm(false);
        onClose(false);
      }
    } catch (error) {
      console.log(error);
    }
    setDisable(false);
  };

  return (
    <>
      <DialogForm
        achivedMode={archiveMode}
        title="Client's Information"
        open={open}
        onClose={() => onClose(false)}
        actions={
          !archiveMode && (
            <Box pb={2} mr={2} display="flex" gap={2}>
              <Button
                disabled={disable}
                color="error"
                size="small"
                onClick={() => setDropConfirm(true)}
                variant="outlined"
              >
                <Typography component={"span"}>DROP</Typography>
              </Button>
              <Button
                disabled={disable}
                color="primary"
                size="small"
                variant="outlined"
              >
                <Typography component={"span"}>Transfer</Typography>
              </Button>
              <Button
                disabled={disable}
                color="success"
                size="small"
                variant="outlined"
              >
                <Typography>Update</Typography>
              </Button>
            </Box>
          )
        }
      >
        <FlexRow>
          <OutlinedTextField
            label="MTOP"
            readOnly={true}
            value={clientDetails?.mtop}
            sx={{ maxWidth: 250 }}
          />

          <FormControl margin="dense" focused>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Date Renewal"
                value={clientDetails?.date}
                readOnly
              />
            </LocalizationProvider>
          </FormControl>
        </FlexRow>

        <Fieldset legend="Owner's Information">
          <FlexRow>
            <OutlinedTextField
              label="Firstname"
              readOnly={true}
              value={clientDetails?.fname}
            />
            <OutlinedTextField
              label="MI"
              value={clientDetails?.mi}
              readOnly={true}
            />
            <OutlinedTextField
              label="Lastname"
              value={clientDetails?.lname}
              readOnly={true}
            />
          </FlexRow>
          <FlexRow>
            <OutlinedTextField
              label="Address"
              value={clientDetails?.address}
              readOnly={true}
            />
            <OutlinedTextField
              label="Contact number"
              value={clientDetails?.contact}
              readOnly={true}
            />
          </FlexRow>
        </Fieldset>

        <Fieldset legend="Driver's Information">
          <FlexRow>
            <OutlinedTextField
              label="Fullname"
              value={clientDetails?.drivername}
              readOnly={true}
            />
            <OutlinedTextField
              label="Contact number"
              value={clientDetails?.contact2}
              readOnly={true}
            />
          </FlexRow>
          <OutlinedTextField
            label="Address"
            value={clientDetails?.driveraddress}
            readOnly={true}
          />
        </Fieldset>

        <Fieldset legend="Vehicle's Information">
          <FlexRow>
            <OutlinedTextField
              label="Model"
              value={clientDetails?.model}
              readOnly={true}
            />
            <OutlinedTextField
              readOnly={true}
              label="Plate No."
              value={clientDetails?.plateno}
            />
          </FlexRow>
          <FlexRow>
            <OutlinedTextField
              label="Motor No."
              value={clientDetails?.motorno}
              readOnly={true}
            />
            <OutlinedTextField
              label="Stroke"
              value={clientDetails?.stroke}
              readOnly={true}
            />
          </FlexRow>
          <FlexRow>
            <OutlinedTextField
              label="Chassis No."
              value={clientDetails?.chassisno}
              readOnly={true}
            />
            <OutlinedTextField
              label="Fuel DISP.(cc)"
              value={clientDetails?.fueldisp}
              readOnly={true}
            />
          </FlexRow>
          <FlexRow>
            <OutlinedTextField
              label="OR No."
              value={clientDetails?.or}
              readOnly={true}
            />
            <OutlinedTextField
              label="CR No."
              value={clientDetails?.cr}
              readOnly={true}
            />
          </FlexRow>
          <FlexRow>
            <OutlinedTextField
              label="TPL Provider"
              value={clientDetails?.tplprovider}
              readOnly={true}
            />

            <FormControl margin="dense" fullWidth>
              <Box
                component={"fieldset"}
                display="flex"
                gap={1}
                alignItems="center"
                borderRadius={1}
                border="1px solid lightgrey"
              >
                <legend style={{ color: "gray" }}>TPL Effectivity</legend>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker slotProps={{ textField: { size: "small" } }} />
                </LocalizationProvider>
                <Typography variant="subtitle1" color="grey">
                  to
                </Typography>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker slotProps={{ textField: { size: "small" } }} s />
                </LocalizationProvider>
              </Box>
            </FormControl>
          </FlexRow>
        </Fieldset>

        <Fieldset legend="Franchise Details">
          <FlexRow>
            <OutlinedTextField
              label="Type of Franchise"
              value={clientDetails?.tpfrnch}
              readOnly={true}
            />
            <OutlinedTextField
              label="Kind of Business"
              value={clientDetails?.kob}
              readOnly={true}
            />
          </FlexRow>

          <FlexRow>
            <OutlinedTextField
              label="TODA"
              value={clientDetails?.toc2}
              readOnly={true}
            />
            <OutlinedTextField
              label="Route"
              value={"San Pablo City"}
              readOnly={true}
            />
          </FlexRow>

          <OutlinedTextField
            label="Remarks"
            value={clientDetails?.remarks}
            readOnly={true}
          />
          <OutlinedTextField
            label="Complaints"
            value={clientDetails?.complaint}
            readOnly={true}
          />
        </Fieldset>
      </DialogForm>

      <ConfirmationDialog
        open={dropConfirm}
        setOpen={setDropConfirm}
        confirm={handleFranchiseRevoke}
        title="Confirm Revocation"
        content="Are you sure you want to revoke this franchise? This action cannot be undone. Revoking this franchise will make its MTOP available for another client."
        disabled={disable}
      />
    </>
  );
};

export default ClientInfo;
