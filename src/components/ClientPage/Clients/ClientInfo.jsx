import {
  Autocomplete,
  Box,
  Button,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
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
import AlertDialog from "../../common/ui/AlertDialog";
import franchiseHelper from "../../common/data/franchiseHelper";
import spcbrgy from "../../common/data/spcbrgy";

const checkedFormModified = (obj1, obj2) => {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) {
    return true;
  }
  for (let key of keys1) {
    if (!(key in obj2) || obj1[key] !== obj2[key]) {
      return true;
    }
  }

  return false;
};

const handleScrollToTop = () => {
  // Scroll to the top of the dialog content
  document
    .getElementById("client-info-content")
    .scrollTo({ top: 0, behavior: "smooth" });
};

const ClientInfo = ({
  open,
  onClose,
  franchiseDetails,
  setFranchiseDetails,
  archiveMode,
  printable,
}) => {
  const axiosPrivate = useAxiosPrivate();

  const [disable, setDisable] = useState(false);
  const [dropConfirm, setDropConfirm] = useState(false);
  const [transferForm, setTransferForm] = useState(false);
  const [updateForm, setUpdateForm] = useState(false);
  const [transferAlertShown, setTransferAlertShown] = useState(false);
  const [closingAlert, setClosingAlert] = useState(false);
  const [readOnly, setReadOnly] = useState(true);
  const [formTitle, setFormTitle] = useState("Client's Information");
  const { setFranchises, franchises } = useData();
  const [alertShown, setAlertShown] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("success");
  const [transferConfirmation, setTransferConfirmation] = useState(false);

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

  const exit = () => {
    onClose(false);
    setTransferForm(false);
    setUpdateForm(false);
    setReadOnly(true);
    setClosingAlert(false);
  };

  const handleCloseOnclick = () => {
    const formIsModified = checkedFormModified(
      {
        ...franchiseHelper.initialFranchiseDetails,
        mtop: franchiseDetails.mtop,
        date: franchiseDetails.date,
        id: franchiseDetails.id,
      },
      franchiseDetails
    );

    if ((transferForm && formIsModified) || (updateForm && formIsModified)) {
      setClosingAlert(true);
      return;
    }
    exit();
  };

  const handleTransferClick = () => {
    setFormTitle("Franchise Transfer Form");
    setReadOnly(false);
    setTransferForm(true);
    setTransferAlertShown(true);
    handleScrollToTop();
    setFranchiseDetails({
      ...franchiseHelper.initialFranchiseDetails,
      mtop: franchiseDetails.mtop,
      date: franchiseDetails.date,
      id: franchiseDetails.id,
    });
  };

  const handleTransferSubmit = async () => {
    setDisable(true);
    try {
      const response = await axiosPrivate.post(
        "/franchise/transfer",
        franchiseDetails
      );

      const newFranchises = [
        ...franchises,
        franchiseHelper.createClientsData(
          response.data.newFranchise._id,
          response.data.newFranchise.MTOP,
          response.data.newFranchise.LASTNAME,
          response.data.newFranchise.FIRSTNAME,
          response.data.newFranchise.MI,
          response.data.newFranchise.ADDRESS,
          response.data.newFranchise.OWNER_NO?.replace(/-/g, "").replace(
            /^0+/g,
            ""
          ),
          response.data.newFranchise.DRIVERS_NO?.replace(/-/g, "").replace(
            /^0+/g,
            ""
          ),
          response.data.newFranchise.TODA,
          response.data.newFranchise.DRIVERS_NAME,
          response.data.newFranchise.DRIVERS_ADDRESS,
          response.data.newFranchise.OR,
          response.data.newFranchise.CR,
          response.data.newFranchise.DRIVERS_LICENSE_NO,
          response.data.newFranchise.MODEL,
          response.data.newFranchise.MOTOR_NO,
          response.data.newFranchise.CHASSIS_NO,
          response.data.newFranchise.PLATE_NO,
          response.data.newFranchise.STROKE,
          response.data.newFranchise.DATE_RENEWAL &&
            new Date(response.data.newFranchise.DATE_RENEWAL),
          response.data.newFranchise.REMARKS,
          response.data.newFranchise.DATE_RELEASE_OF_ST_TP &&
            new Date(response.data.newFranchise.DATE_RELEASE_OF_ST_TP),
          response.data.newFranchise.COMPLAINT,
          response.data.newFranchise.DATE_ARCHIVED,
          response.data.newFranchise.OWNER_SEX,
          response.data.newFranchise.DRIVERS_SEX,
          response.data.newFranchise.TPL_PROVIDER,
          response.data.newFranchise.TPL_DATE_1 &&
            new Date(response.data.newFranchise.TPL_DATE_1),
          response.data.newFranchise.TPL_DATE_2 &&
            new Date(response.data.newFranchise.TPL_DATE_2),
          response.data.newFranchise.FUEL_DISP,
          response.data.newFranchise.TYPE_OF_FRANCHISE,
          response.data.newFranchise.KIND_OF_BUSINESS,
          response.data.newFranchise.ROUTE
        ),
      ];

      newFranchises.sort((a, b) => {
        const mtopA = parseInt(a.mtop);
        const mtopB = parseInt(b.mtop);
        if (mtopA < mtopB) {
          return -1; // 'a' comes before 'b'
        }
        if (mtopA > mtopB) {
          return 1; // 'b' comes before 'a'
        }
        return 0; // 'a' and 'b' are equal
      });

      setFranchises(
        newFranchises.filter((frnhs) => frnhs.id !== franchiseDetails.id)
      );
      setFranchiseDetails(franchiseHelper.initialFranchiseDetails);
      setAlertSeverity("success");
      setAlertMsg(
        "Success! The franchise has been added to the system successfully"
      );
      console.log(response.data);
    } catch (error) {
      console.log(error);

      setAlertSeverity("error");
      if (error.response?.status == 400) {
        setAlertMsg(
          "Failed to transfer Franchise. " + error.response.data.message
        );
      } else {
        setAlertMsg("Failed to transfer Franchise. Please try again later.");
      }
    }
    setTransferConfirmation(false);
    onClose(false);
    setTransferForm(false);
    setAlertShown(true);
    setDisable(false);
  };

  return (
    <>
      <DialogForm
        onSubmit={(e) => {
          e.preventDefault();
          setTransferConfirmation(true);
        }}
        printable={printable}
        title={formTitle}
        open={open}
        onClose={handleCloseOnclick}
        actions={
          !archiveMode && (
            <>
              {transferForm && (
                <>
                  <Button disabled={disable} type="submit">
                    Submit
                  </Button>
                  <Button
                    sx={{ color: "InactiveCaptionText" }}
                    disabled={disable}
                    onClick={handleCloseOnclick}
                  >
                    Cancel
                  </Button>
                </>
              )}
              {updateForm && (
                <>
                  <Button disabled={disable}>Submit</Button>
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
                  <Button disabled={disable} onClick={handleTransferClick}>
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
            required={true}
            label="MTOP"
            value={franchiseDetails?.mtop}
            sx={{ maxWidth: 250 }}
            readOnly={true}
          />

          <FormControl margin="dense" focused>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Date Renewal"
                value={franchiseDetails?.date || null}
                readOnly={readOnly}
                onChange={(date) =>
                  setFranchiseDetails((prev) => ({ ...prev, date: date }))
                }
              />
            </LocalizationProvider>
          </FormControl>
        </FlexRow>

        <Fieldset legend="Owner's Information">
          <FlexRow>
            <OutlinedTextField
              required={true}
              label="Firstname"
              readOnly={readOnly}
              value={franchiseDetails?.fname}
              onChange={(e) =>
                setFranchiseDetails((prev) => ({
                  ...prev,
                  fname: e.target.value,
                }))
              }
            />
            <OutlinedTextField
              label="MI"
              value={franchiseDetails?.mi}
              readOnly={readOnly}
              onChange={(e) =>
                setFranchiseDetails((prev) => ({
                  ...prev,
                  mi: e.target.value,
                }))
              }
            />
            <OutlinedTextField
              required={true}
              label="Lastname"
              value={franchiseDetails?.lname}
              readOnly={readOnly}
              onChange={(e) =>
                setFranchiseDetails((prev) => ({
                  ...prev,
                  lname: e.target.value,
                }))
              }
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
                onChange={(e) =>
                  setFranchiseDetails((prev) => ({
                    ...prev,
                    ownerSex: e.target.value,
                  }))
                }
              >
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
              </Select>
            </FormControl>
            <OutlinedTextField
              required={true}
              label="Contact number"
              value={franchiseDetails?.contact}
              readOnly={readOnly}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">+63</InputAdornment>
                ),
              }}
              onChange={(e) =>
                setFranchiseDetails((prev) => ({
                  ...prev,
                  contact: e.target.value,
                }))
              }
            />

            <Autocomplete
              readOnly={readOnly}
              freeSolo
              disablePortal
              clearIcon={false}
              options={spcbrgy}
              fullWidth
              value={franchiseDetails?.address}
              onChange={(_, value) =>
                setFranchiseDetails((prev) => ({
                  ...prev,
                  address: value || "",
                }))
              }
              renderInput={(params) => (
                <TextField {...params} required label="Address" />
              )}
            />
          </FlexRow>
        </Fieldset>

        <Fieldset legend="Driver's Information">
          <FlexRow>
            <OutlinedTextField
              required={true}
              label="Fullname"
              value={franchiseDetails?.drivername}
              readOnly={readOnly}
              onChange={(e) =>
                setFranchiseDetails((prev) => ({
                  ...prev,
                  drivername: e.target.value,
                }))
              }
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
                onChange={(e) =>
                  setFranchiseDetails((prev) => ({
                    ...prev,
                    driverSex: e.target.value,
                  }))
                }
              >
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
              </Select>
            </FormControl>
            <OutlinedTextField
              required={true}
              label="Contact no."
              value={franchiseDetails?.contact2}
              readOnly={readOnly}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">+63</InputAdornment>
                ),
              }}
              onChange={(e) =>
                setFranchiseDetails((prev) => ({
                  ...prev,
                  contact2: e.target.value,
                }))
              }
            />
          </FlexRow>
          <FlexRow>
            <Autocomplete
              readOnly={readOnly}
              freeSolo
              disablePortal
              clearIcon={false}
              options={spcbrgy}
              fullWidth
              value={franchiseDetails?.driveraddress}
              onChange={(_, value) =>
                setFranchiseDetails((prev) => ({
                  ...prev,
                  driveraddress: value || "",
                }))
              }
              renderInput={(params) => (
                <TextField {...params} required label="Address" />
              )}
            />
            <OutlinedTextField
              required={true}
              label="Driver's License no."
              value={franchiseDetails?.driverlicenseno}
              readOnly={readOnly}
              onChange={(e) =>
                setFranchiseDetails((prev) => ({
                  ...prev,
                  driverlicenseno: e.target.value,
                }))
              }
            />
          </FlexRow>
        </Fieldset>

        <Fieldset legend="Vehicle's Information">
          <FlexRow>
            <OutlinedTextField
              required={true}
              label="Model"
              value={franchiseDetails?.model}
              readOnly={readOnly}
              onChange={(e) =>
                setFranchiseDetails((prev) => ({
                  ...prev,
                  model: e.target.value,
                }))
              }
            />
            <OutlinedTextField
              required={true}
              readOnly={readOnly}
              label="Plate no."
              value={franchiseDetails?.plateno}
              onChange={(v) => {
                setFranchiseDetails((prev) => ({
                  ...prev,
                  plateno: v.target.value,
                }));
              }}
            />
          </FlexRow>
          <FlexRow>
            <OutlinedTextField
              required={true}
              label="Motor No."
              value={franchiseDetails?.motorno}
              readOnly={readOnly}
              onChange={(e) =>
                setFranchiseDetails((prev) => ({
                  ...prev,
                  motorno: e.target.value,
                }))
              }
            />
            <OutlinedTextField
              label="Stroke"
              value={franchiseDetails?.stroke}
              readOnly={readOnly}
              onChange={(e) =>
                setFranchiseDetails((prev) => ({
                  ...prev,
                  stroke: e.target.value,
                }))
              }
            />
          </FlexRow>
          <FlexRow>
            <OutlinedTextField
              required={true}
              label="Chassis No."
              value={franchiseDetails?.chassisno}
              readOnly={readOnly}
              onChange={(e) =>
                setFranchiseDetails((prev) => ({
                  ...prev,
                  chassisno: e.target.value,
                }))
              }
            />
            <OutlinedTextField
              label="Fuel DISP.(cc)"
              value={franchiseDetails?.fuelDisp}
              readOnly={readOnly}
              onChange={(e) =>
                setFranchiseDetails((prev) => ({
                  ...prev,
                  fuelDisp: e.target.value,
                }))
              }
            />
          </FlexRow>
          <FlexRow>
            <OutlinedTextField
              required={true}
              label="OR no."
              value={franchiseDetails?.or}
              readOnly={readOnly}
              onChange={(e) =>
                setFranchiseDetails((prev) => ({
                  ...prev,
                  or: e.target.value,
                }))
              }
            />
            <OutlinedTextField
              required={true}
              label="CR no."
              value={franchiseDetails?.cr}
              readOnly={readOnly}
              onChange={(e) =>
                setFranchiseDetails((prev) => ({
                  ...prev,
                  cr: e.target.value,
                }))
              }
            />
          </FlexRow>
          <FlexRow>
            <OutlinedTextField
              label="TPL Provider"
              value={franchiseDetails?.tplProvider}
              readOnly={readOnly}
              onChange={(e) =>
                setFranchiseDetails((prev) => ({
                  ...prev,
                  tplProvider: e.target.value,
                }))
              }
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
                    value={franchiseDetails?.tplDate1 || null}
                    onChange={(date) =>
                      setFranchiseDetails((prev) => ({
                        ...prev,
                        tplDate1: date,
                      }))
                    }
                  />
                </LocalizationProvider>
                <Typography variant="subtitle1" color="grey">
                  to
                </Typography>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    slotProps={{ textField: { size: "small" } }}
                    readOnly={readOnly}
                    value={franchiseDetails?.tplDate2 || null}
                    onChange={(date) =>
                      setFranchiseDetails((prev) => ({
                        ...prev,
                        tplDate2: date,
                      }))
                    }
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
              onChange={(e) =>
                setFranchiseDetails((prev) => ({
                  ...prev,
                  typeofFranchise: e.target.value,
                }))
              }
            />
            <OutlinedTextField
              label="Kind of Business"
              value={franchiseDetails?.kindofBusiness}
              readOnly={readOnly}
              onChange={(e) =>
                setFranchiseDetails((prev) => ({
                  ...prev,
                  kindofBusiness: e.target.value,
                }))
              }
            />
          </FlexRow>

          <FlexRow>
            <OutlinedTextField
              required={true}
              label="TODA"
              value={franchiseDetails?.toda}
              readOnly={readOnly}
              onChange={(e) =>
                setFranchiseDetails((prev) => ({
                  ...prev,
                  toda: e.target.value,
                }))
              }
            />
            <OutlinedTextField
              label="Route"
              value={franchiseDetails?.route}
              readOnly={readOnly}
              onChange={(e) =>
                setFranchiseDetails((prev) => ({
                  ...prev,
                  route: e.target.value,
                }))
              }
            />
          </FlexRow>
          <FlexRow>
            <FormControl margin="dense" fullWidth focused>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Date Release of ST/TP"
                  value={franchiseDetails?.daterelease || null}
                  readOnly={readOnly}
                  onChange={(date) =>
                    setFranchiseDetails((prev) => ({
                      ...prev,
                      daterelease: date,
                    }))
                  }
                />
              </LocalizationProvider>
            </FormControl>
            <OutlinedTextField
              label="Remarks"
              value={franchiseDetails?.remarks}
              readOnly={readOnly}
              onChange={(e) =>
                setFranchiseDetails((prev) => ({
                  ...prev,
                  remarks: e.target.value,
                }))
              }
            />
          </FlexRow>

          {!transferForm && (
            <OutlinedTextField
              label="Complaints"
              value={franchiseDetails?.complaint}
              readOnly={readOnly}
              onChange={(e) =>
                setFranchiseDetails((prev) => ({
                  ...prev,
                  complaint: e.target.value,
                }))
              }
            />
          )}
        </Fieldset>
      </DialogForm>

      <SnackBar
        open={alertShown}
        onClose={setAlertShown}
        msg={alertMsg}
        severity={alertSeverity}
      />

      <ConfirmationDialog
        open={dropConfirm}
        setOpen={setDropConfirm}
        confirm={handleFranchiseRevoke}
        title="Confirm Revocation"
        content="Are you sure you want to revoke this franchise? This action cannot be undone. Revoking this franchise will make its MTOP available for another client."
        disabled={disable}
        serverity={"error"}
      />

      <ConfirmationDialog
        open={closingAlert}
        setOpen={setClosingAlert}
        confirm={exit}
        title="Confirmation"
        content="Closing this form will discard all the data you have entered into the input fields. Are you sure you want to close it?"
        label="Yes, close it"
      />

      <AlertDialog
        open={transferAlertShown}
        setOpen={setTransferAlertShown}
        confirm={() => setTransferAlertShown(false)}
        title="Franchise Transfer Initiated"
        content="Please fill out the following details to transfer the franchise to another client. Ensure all information is accurate before submitting"
      />

      <ConfirmationDialog
        open={transferConfirmation}
        setOpen={setTransferConfirmation}
        confirm={handleTransferSubmit}
        title="Transfer Franchise Confirmation"
        content="Please confirm the transfer of the franchise. Once confirmed, the new franchise will be added to the system, and the current franchise data will be moved to the archive."
        disabled={disable}
      />
    </>
  );
};

export default ClientInfo;
