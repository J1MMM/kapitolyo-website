import {
  Autocomplete,
  Box,
  Button,
  CircularProgress,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import useData from "../../../hooks/useData";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import DialogForm from "../../common/ui/DialogForm";
import OutlinedTextField from "../../common/ui/OutlinedTextField";
import FlexRow from "../../common/ui/FlexRow";
import Fieldset from "../../common/ui/Fieldset";
import SnackBar from "../../common/ui/SnackBar";
import helper from "../helper";
import ConfirmationDialog from "../../common/ui/ConfirmationDialog";
import spcbrgy from "../../common/data/spcbrgy";

const AddFranchiseForm = ({ open, onClose }) => {
  const axiosPrivate = useAxiosPrivate();
  const { franchises, setFranchises, availableMTOP } = useData();

  const [franchiseDetails, setFranchiseDetails] = useState(
    helper.initialFranchiseDetails
  );
  const [disable, setDisable] = useState(false);
  const [alertShown, setAlertShown] = useState(false);
  const [confirmaionShown, setConfirmaionShown] = useState(false);
  const [confirm, setConfirmaion] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("success");

  const handleAddFranchise = async () => {
    setDisable(true);
    try {
      const response = await axiosPrivate.post("/franchise", {
        mtop: franchiseDetails.mtop,
        dateRenewal: franchiseDetails.date,
        ownerFname: franchiseDetails.fname,
        ownerLname: franchiseDetails.lname,
        ownerMI: franchiseDetails.mi,
        ownerAddress: franchiseDetails.address,
        ownerContact: franchiseDetails.contact,
        driverFullname: franchiseDetails.drivername,
        driverAddress: franchiseDetails.driveraddress,
        driverContact: franchiseDetails.contact2,
        model: franchiseDetails.model,
        plateno: franchiseDetails.plateno,
        motorno: franchiseDetails.motorno,
        stroke: franchiseDetails.stroke,
        chasisno: franchiseDetails.chassisno,
        fueldisp: franchiseDetails.fuelDisp,
        OR: franchiseDetails.or,
        CR: franchiseDetails.cr,
        tplProvider: franchiseDetails.tplProvider,
        tplDate1: franchiseDetails.tplDate1,
        tplDate2: franchiseDetails.tplDate2,
        typeOfFranchise: franchiseDetails.typeofFranchise,
        kindOfBusiness: franchiseDetails.kindofBusiness,
        toda: franchiseDetails.toda,
        route: franchiseDetails.route,
        remarks: franchiseDetails.remarks,
        complaints: franchiseDetails.complaint,
      });

      const newFranchises = [
        ...franchises,
        helper.createClientsData(
          response.data._id,
          response.data.MTOP,
          response.data.LASTNAME,
          response.data.FIRSTNAME,
          response.data.MI,
          response.data.ADDRESS,
          response.data.OWNER_NO,
          response.data.DRIVERS_NO,
          response.data.TODA,
          response.data.DRIVERS_NAME,
          response.data.DRIVERS_ADDRESS,
          response.data.OR,
          response.data.CR,
          response.data.DRIVERS_LICENSE_NO,
          response.data.MODEL,
          response.data.MOTOR_NO,
          response.data.CHASSIS_NO,
          response.data.PLATE_NO,
          response.data.STROKE,
          response.data.DATE_RENEWAL
            ? new Date(response.data.DATE_RENEWAL)
            : response.data.DATE_RENEWAL,
          response.data.REMARKS,
          response.data.DATE_RELEASE_OF_ST_TP
            ? new Date(response.data.DATE_RELEASE_OF_ST_TP)
            : response.data.DATE_RELEASE_OF_ST_TP,
          response.data.COMPLAINT
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

      setFranchises(newFranchises);
      setFranchiseDetails(helper.initialFranchiseDetails);
      setAlertSeverity("success");
      setAlertMsg("Franchise added successfully");
      console.log(response.data);
    } catch (error) {
      setAlertSeverity("error");
      if (error.response.status == 400) {
        setAlertMsg("Failed to add Franchise. " + error.response.data.message);
      } else {
        setAlertMsg("Failed to add Franchise. Please try again later.");
      }
      console.log(error);
    }
    setConfirmaionShown(false);
    onClose(false);
    setAlertShown(true);
    setDisable(false);
  };

  const availableMtopEl = availableMTOP.map((mtop, index) => {
    return (
      <MenuItem key={index} value={mtop}>
        {mtop}
      </MenuItem>
    );
  });

  return (
    <>
      <DialogForm
        onSubmit={(e) => {
          e.preventDefault();
          setConfirmaionShown(true);
        }}
        printable={false}
        title="Add New Client"
        open={open}
        onClose={() => onClose(false)}
        actions={
          <>
            <Button
              disabled={disable}
              onClick={() => onClose(false)}
              sx={{ color: "grey" }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={
                disable ||
                availableMTOP.length == 0 ||
                franchiseDetails.mtop == ""
              }
            >
              Submit
            </Button>
          </>
        }
      >
        <FlexRow>
          <FormControl fullWidth margin="dense" sx={{ maxWidth: 250 }}>
            <InputLabel id="gender">
              {availableMTOP.length == 0 ? "no available MTOP" : "MTOP"}
            </InputLabel>
            <Select
              disabled={availableMTOP.length == 0 || disable}
              label="MTOP"
              required
              fullWidth
              value={franchiseDetails.mtop}
              onChange={(e) =>
                setFranchiseDetails((prev) => ({
                  ...prev,
                  mtop: e.target.value,
                }))
              }
            >
              {availableMtopEl}
            </Select>
          </FormControl>

          <FormControl margin="dense" focused required>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Date Renewal"
                value={franchiseDetails.date}
                onChange={(date) =>
                  setFranchiseDetails((prev) => ({ ...prev, date: date }))
                }
              />
            </LocalizationProvider>
          </FormControl>
        </FlexRow>

        <Fieldset legend="Owner's Information">
          <Box
            display="flex"
            gap={2}
            sx={{
              flexDirection: {
                xs: "column",
                sm: "row",
              },
            }}
          >
            <OutlinedTextField
              required={true}
              label="Firstname"
              value={franchiseDetails.fname}
              onChange={(e) =>
                setFranchiseDetails((prev) => ({
                  ...prev,
                  fname: e.target.value,
                }))
              }
            />
            <OutlinedTextField
              required={true}
              label="Middlename"
              value={franchiseDetails.mi}
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
              value={franchiseDetails.lname}
              onChange={(e) =>
                setFranchiseDetails((prev) => ({
                  ...prev,
                  lname: e.target.value,
                }))
              }
            />
          </Box>

          <FlexRow>
            <FormControl fullWidth margin="dense">
              <InputLabel>Sex</InputLabel>
              <Select
                disabled={disable}
                label="Sex"
                required
                fullWidth
                value={franchiseDetails.ownerSex}
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
              label="Contact no."
              value={franchiseDetails.contact}
              onChange={(e) =>
                setFranchiseDetails((prev) => ({
                  ...prev,
                  contact: e.target.value,
                }))
              }
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">+63</InputAdornment>
                ),
              }}
              error={franchiseDetails.contact.length > 10}
            />

            <Autocomplete
              disablePortal
              clearIcon={false}
              options={spcbrgy}
              fullWidth
              value={franchiseDetails.address}
              onChange={(_, v) =>
                setFranchiseDetails((prev) => ({
                  ...prev,
                  address: v,
                }))
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  onChange={(v) =>
                    setFranchiseDetails((prev) => ({
                      ...prev,
                      address: v.target.value,
                    }))
                  }
                  label="Address"
                  required
                />
              )}
            />
          </FlexRow>
        </Fieldset>

        <Fieldset legend="Driver's Information">
          <FlexRow>
            <OutlinedTextField
              required={true}
              label="Fullname"
              value={franchiseDetails.drivername}
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
                label="Sex"
                required
                fullWidth
                value={franchiseDetails.driverSex}
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
          </FlexRow>
          <FlexRow>
            <OutlinedTextField
              required={true}
              label="Contact no."
              value={franchiseDetails.contact2}
              onChange={(e) =>
                setFranchiseDetails((prev) => ({
                  ...prev,
                  contact2: e.target.value,
                }))
              }
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">+63</InputAdornment>
                ),
              }}
              error={franchiseDetails.contact2.length > 10}
            />

            <Autocomplete
              disablePortal
              clearIcon={false}
              options={spcbrgy}
              fullWidth
              value={franchiseDetails.driveraddress}
              onChange={(_, v) =>
                setFranchiseDetails((prev) => ({
                  ...prev,
                  driveraddress: v,
                }))
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  required
                  label="Address"
                  onChange={(v) =>
                    setFranchiseDetails((prev) => ({
                      ...prev,
                      driveraddress: v.target.value,
                    }))
                  }
                />
              )}
            />
          </FlexRow>
        </Fieldset>

        <Fieldset legend="Vehicle's Information">
          <FlexRow>
            <OutlinedTextField
              required={true}
              label="Model"
              value={franchiseDetails.model}
              onChange={(e) =>
                setFranchiseDetails((prev) => ({
                  ...prev,
                  model: e.target.value,
                }))
              }
            />
            <OutlinedTextField
              required={true}
              label="Plate No."
              value={franchiseDetails.plateno}
              onChange={(e) =>
                setFranchiseDetails((prev) => ({
                  ...prev,
                  plateno: e.target.value,
                }))
              }
            />
          </FlexRow>

          <FlexRow>
            <OutlinedTextField
              required={true}
              label="Motor No."
              value={franchiseDetails.motorno}
              onChange={(e) =>
                setFranchiseDetails((prev) => ({
                  ...prev,
                  motorno: e.target.value,
                }))
              }
            />
            <OutlinedTextField
              required={true}
              label="Stroke"
              value={franchiseDetails.stroke}
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
              value={franchiseDetails.chassisno}
              onChange={(e) =>
                setFranchiseDetails((prev) => ({
                  ...prev,
                  chassisno: e.target.value,
                }))
              }
            />
            <OutlinedTextField
              label="Fuel DISP.(cc)"
              value={franchiseDetails.fuelDisp}
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
              value={franchiseDetails.or}
              onChange={(e) =>
                setFranchiseDetails((prev) => ({
                  ...prev,
                  or: e.target.value,
                }))
              }
            />
            <OutlinedTextField
              label="CR no."
              required={true}
              value={franchiseDetails.cr}
              onChange={(e) =>
                setFranchiseDetails((prev) => ({
                  ...prev,
                  cr: e.target.value,
                }))
              }
            />
          </FlexRow>

          <Box
            display="flex"
            alignItems="center"
            gap={2}
            sx={{
              flexDirection: {
                xs: "column",
                sm: "row",
              },
            }}
          >
            <OutlinedTextField
              label="TPL Provider"
              value={franchiseDetails.tplProvider}
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
                    value={franchiseDetails.tplDate1}
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
                    value={franchiseDetails.tplDate2}
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
          </Box>
        </Fieldset>

        <Fieldset legend="Franchise Details">
          <FlexRow>
            <OutlinedTextField
              label="Type of Franchise"
              value={franchiseDetails.typeofFranchise}
              onChange={(e) =>
                setFranchiseDetails((prev) => ({
                  ...prev,
                  typeofFranchise: e.target.value,
                }))
              }
            />
            <OutlinedTextField
              label="Kind of Business"
              value={franchiseDetails.kindofBusiness}
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
              value={franchiseDetails.toda}
              onChange={(e) =>
                setFranchiseDetails((prev) => ({
                  ...prev,
                  toda: e.target.value,
                }))
              }
            />
            <OutlinedTextField
              label="Route"
              value={franchiseDetails.route}
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
                  value={franchiseDetails.daterelease}
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
              value={franchiseDetails.remarks}
              onChange={(e) =>
                setFranchiseDetails((prev) => ({
                  ...prev,
                  remarks: e.target.value,
                }))
              }
            />
          </FlexRow>
        </Fieldset>
      </DialogForm>

      <SnackBar
        open={alertShown}
        onClose={setAlertShown}
        severity={alertSeverity}
        msg={alertMsg}
      />

      <ConfirmationDialog
        open={confirmaionShown}
        setOpen={setConfirmaionShown}
        confirm={handleAddFranchise}
        title="New Franchise Confirmation"
        content="Are you sure you want to add this franchise? Once confirmed, the franchise will be added to the system."
        disabled={disable}
      />
    </>
  );
};

export default AddFranchiseForm;
