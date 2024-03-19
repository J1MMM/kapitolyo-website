import {
  Box,
  Button,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
  Typography,
} from "@mui/material";
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
import SnackBar from "../../common/ui/SnackBar";

const ClientInfo = ({
  open,
  onClose,
  franchiseDetails,
  archiveMode,
  printable,
}) => {
  const axiosPrivate = useAxiosPrivate();
  const [disable, setDisable] = useState(false);
  const [dropConfirm, setDropConfirm] = useState(false);
  const [transferForm, setTransferForm] = useState(false);
  const [updateForm, setUpdateForm] = useState(false);
  const [readOnly, setReadOnly] = useState(true);
  const {
    setFranchises,
    setArchivedFranchises,
    setAvailableMTOP,
    availableMTOP,
  } = useData();
  const [alertShown, setAlertShown] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("success");

  const handleFranchiseRevoke = async () => {
    setDisable(true);
    const id = franchiseDetails?.id;
    try {
      await axiosPrivate.patch("/franchise", { id });
      setFranchises((prev) => prev.filter((franchise) => franchise.id != id));
      onClose(false);
      setDropConfirm(false);
      setAlertSeverity("success");
      setAlertMsg(
        "Franchise successfully archived. The MTOP is now available for reassignment."
      );
    } catch (error) {
      setAlertSeverity("error");
      setAlertMsg("Failed to archive franchise. Please try again later.");
      console.log(error);
    }
    setAlertShown(true);
    setDisable(false);
  };

  return (
    <>
      <DialogForm
        printable={printable}
        title="Client's Information"
        open={open}
        onClose={() => onClose(false)}
        actions={
          !archiveMode && (
            <>
              {transferForm && (
                <>
                  <Button disabled={disable}>Transfer</Button>
                  <Button
                    sx={{ color: "InactiveCaptionText" }}
                    disabled={disable}
                    onClick={() => setTransferForm(false)}
                  >
                    Cancel
                  </Button>
                </>
              )}
              {updateForm && (
                <>
                  <Button disabled={disable}>Update</Button>
                  <Button
                    sx={{ color: "InactiveCaptionText" }}
                    disabled={disable}
                    onClick={() => setUpdateForm(false)}
                  >
                    Cancel
                  </Button>
                </>
              )}
              {!transferForm && !updateForm && (
                <>
                  <Button
                    color="error"
                    disabled={disable}
                    onClick={() => setDropConfirm(true)}
                  >
                    DROP
                  </Button>
                  <Button
                    disabled={disable}
                    onClick={() => {
                      setReadOnly(false);
                      setTransferForm(true);
                    }}
                  >
                    Transfer
                  </Button>
                  <Button
                    disabled={disable}
                    onClick={() => setUpdateForm(true)}
                  >
                    Update
                  </Button>
                </>
              )}
            </>
          )
        }
      >
        <FlexRow>
          <OutlinedTextField
            label="MTOP"
            value={franchiseDetails?.mtop}
            sx={{ maxWidth: 250 }}
            readOnly={true}
          />

          <FormControl margin="dense" focused>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Date Renewal"
                value={franchiseDetails?.date}
                readOnly={readOnly}
              />
            </LocalizationProvider>
          </FormControl>
        </FlexRow>

        <Fieldset legend="Owner's Information">
          <FlexRow>
            <OutlinedTextField
              label="Firstname"
              readOnly={readOnly}
              value={franchiseDetails?.fname}
            />
            <OutlinedTextField
              label="MI"
              value={franchiseDetails?.mi}
              readOnly={readOnly}
            />
            <OutlinedTextField
              label="Lastname"
              value={franchiseDetails?.lname}
              readOnly={readOnly}
            />
          </FlexRow>
          <FlexRow>
            <FormControl fullWidth margin="dense">
              <InputLabel>Sex</InputLabel>
              <Select
                readOnly={readOnly}
                disabled={disable}
                label="Sex"
                required
                fullWidth
                value={
                  franchiseDetails.ownerSex ? franchiseDetails.ownerSex : ""
                }
              >
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
              </Select>
            </FormControl>
            <OutlinedTextField
              label="Contact number"
              value={franchiseDetails?.contact}
              readOnly={readOnly}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">+63</InputAdornment>
                ),
              }}
            />
            <OutlinedTextField
              label="Address"
              value={franchiseDetails?.address}
              readOnly={readOnly}
            />
          </FlexRow>
        </Fieldset>

        <Fieldset legend="Driver's Information">
          <FlexRow>
            <OutlinedTextField
              label="Fullname"
              value={franchiseDetails?.drivername}
              readOnly={readOnly}
            />
            <FormControl fullWidth margin="dense">
              <InputLabel>Sex</InputLabel>
              <Select
                disabled={disable}
                readOnly={readOnly}
                label="Sex"
                required
                fullWidth
                value={
                  franchiseDetails.driverSex ? franchiseDetails.driverSex : ""
                }
              >
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
              </Select>
            </FormControl>
            <OutlinedTextField
              label="Contact no."
              value={franchiseDetails?.contact2}
              readOnly={readOnly}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">+63</InputAdornment>
                ),
              }}
            />
          </FlexRow>
          <FlexRow>
            <OutlinedTextField
              label="Address"
              value={franchiseDetails?.driveraddress}
              readOnly={readOnly}
            />
            <OutlinedTextField
              required={true}
              label="Driver's License no."
              value={franchiseDetails?.driverlicenseno}
            />
          </FlexRow>
        </Fieldset>

        <Fieldset legend="Vehicle's Information">
          <FlexRow>
            <OutlinedTextField
              label="Model"
              value={franchiseDetails?.model}
              readOnly={readOnly}
            />
            <OutlinedTextField
              readOnly={readOnly}
              label="Plate no."
              value={franchiseDetails?.plateno}
            />
          </FlexRow>
          <FlexRow>
            <OutlinedTextField
              label="Motor No."
              value={franchiseDetails?.motorno}
              readOnly={readOnly}
            />
            <OutlinedTextField
              label="Stroke"
              value={franchiseDetails?.stroke}
              readOnly={readOnly}
            />
          </FlexRow>
          <FlexRow>
            <OutlinedTextField
              label="Chassis No."
              value={franchiseDetails?.chassisno}
              readOnly={readOnly}
            />
            <OutlinedTextField
              label="Fuel DISP.(cc)"
              value={franchiseDetails?.fuelDisp}
              readOnly={readOnly}
            />
          </FlexRow>
          <FlexRow>
            <OutlinedTextField
              label="OR no."
              value={franchiseDetails?.or}
              readOnly={readOnly}
            />
            <OutlinedTextField
              label="CR no."
              value={franchiseDetails?.cr}
              readOnly={readOnly}
            />
          </FlexRow>
          <FlexRow>
            <OutlinedTextField
              label="TPL Provider"
              value={franchiseDetails?.tplProvider}
              readOnly={readOnly}
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
                  <DatePicker
                    slotProps={{ textField: { size: "small" } }}
                    readOnly={readOnly}
                    value={franchiseDetails.tplDate1}
                  />
                </LocalizationProvider>
                <Typography variant="subtitle1" color="grey">
                  to
                </Typography>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    slotProps={{ textField: { size: "small" } }}
                    readOnly={readOnly}
                    value={franchiseDetails.tplDate2}
                  />
                </LocalizationProvider>
              </Box>
            </FormControl>
          </FlexRow>
        </Fieldset>

        <Fieldset legend="Franchise Details">
          <FlexRow>
            <OutlinedTextField
              label="Type of Franchise"
              value={franchiseDetails?.typeofFranchise}
              readOnly={readOnly}
            />
            <OutlinedTextField
              label="Kind of Business"
              value={franchiseDetails?.kindofBusiness}
              readOnly={readOnly}
            />
          </FlexRow>

          <FlexRow>
            <OutlinedTextField
              label="TODA"
              value={franchiseDetails?.toda}
              readOnly={readOnly}
            />
            <OutlinedTextField
              label="Route"
              value={"San Pablo City"}
              readOnly={readOnly}
            />
          </FlexRow>
          <FlexRow>
            <FormControl margin="dense" fullWidth focused>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Date Release of ST/TP"
                  value={franchiseDetails?.daterelease}
                />
              </LocalizationProvider>
            </FormControl>
            <OutlinedTextField
              label="Remarks"
              value={franchiseDetails?.remarks}
              readOnly={readOnly}
            />
          </FlexRow>
          <OutlinedTextField
            label="Complaints"
            value={franchiseDetails?.complaint}
            readOnly={readOnly}
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

      <SnackBar
        open={alertShown}
        onClose={setAlertShown}
        msg={alertMsg}
        severity={alertSeverity}
      />
    </>
  );
};

export default ClientInfo;
