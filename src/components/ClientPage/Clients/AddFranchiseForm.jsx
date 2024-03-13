import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
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
import {
  useOwnerInformation,
  useDriverInformation,
  useVehicleInformation,
  useFranchiseInformation,
} from "../../../hooks/franchiseHooks";

const AddFranchiseForm = ({ open, onClose, printable }) => {
  const axiosPrivate = useAxiosPrivate();
  const { franchises, availableMTOP, setAvailableMTOP } = useData();
  const [disable, setDisable] = useState(false);
  const [mtop, setMtop] = useState("");
  const [dateRenewal, setdateRenewal] = useState(new Date());
  const {
    ownerFname,
    setOwnerFname,
    ownerLname,
    setOwnerLname,
    ownerMI,
    setOwnerMI,
    ownerAddress,
    setOwnerAddress,
    ownerContact,
    setOwnerContact,
  } = useOwnerInformation();
  const {
    driverFullname,
    setDriverFullname,
    driverAddress,
    setDriverAddress,
    driverContact,
    setDriverContact,
  } = useDriverInformation();
  const {
    model,
    setModel,
    plateno,
    setPlateno,
    motorno,
    setMotorno,
    stroke,
    setStroke,
    chasisno,
    setChasisno,
    fueldisp,
    setFueldisp,
    OR,
    setOR,
    CR,
    setCR,
    tplProvider,
    setTplProvider,
    tplDate1,
    setTplDate1,
    tplDate2,
    setTplDate2,
  } = useVehicleInformation();
  const {
    typeOfFranchise,
    setTypeOfFranchise,
    kindOfBusiness,
    setKindOfBusiness,
    toda,
    setToda,
    route,
    setRoute,
    remarks,
    setRemarks,
    complaints,
    setComplaints,
  } = useFranchiseInformation();

  const availableMtopEl = availableMTOP.map((mtop) => {
    return (
      <MenuItem key={mtop} value={mtop}>
        {mtop}
      </MenuItem>
    );
  });

  return (
    <DialogForm
      printable={printable}
      title="Add New Client"
      open={open}
      onClose={() => onClose(false)}
      actions={
        <Box pb={2} mr={2} display="flex" gap={2}>
          <Button
            disabled={disable}
            onClick={() => onClose(false)}
            color="inherit"
            variant="outlined"
            size="small"
          >
            <Typography>Cancel</Typography>
          </Button>
          <Button
            type="submit"
            disabled={disable}
            color="success"
            variant="outlined"
            size="small"
          >
            {disable && <CircularProgress size={16} color="inherit" />}{" "}
            <Typography component={"span"} ml={1}>
              {disable ? "Loading..." : "Submit"}
            </Typography>
          </Button>
        </Box>
      }
    >
      <FlexRow>
        <FormControl fullWidth margin="dense" sx={{ maxWidth: 250 }}>
          <InputLabel id="gender">
            {availableMTOP.length == 0 ? "no MTOP available" : "MTOP"}
          </InputLabel>
          <Select
            disabled={availableMTOP.length == 0}
            label="MTOP"
            required
            fullWidth
            value={mtop}
            onChange={(e) => setMtop(e.target.value)}
          >
            {availableMtopEl}
          </Select>
        </FormControl>

        <FormControl margin="dense" focused>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Date Renewal"
              value={dateRenewal}
              onChange={(date) => setdateRenewal(date)}
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
            label="Firstname"
            value={ownerFname}
            onChange={(e) => setOwnerFname(e.target.value)}
          />
          <OutlinedTextField label="Middlename" />
          <OutlinedTextField label="Lastname" />
        </Box>

        <FlexRow>
          <OutlinedTextField label="Address" />
          <OutlinedTextField label="Contact Number" />
        </FlexRow>
      </Fieldset>

      <Fieldset legend="Driver's Information">
        <FlexRow>
          <OutlinedTextField label="Fullname" />
          <OutlinedTextField label="Contact Number" />
        </FlexRow>

        <OutlinedTextField label="Address" />
      </Fieldset>

      <Fieldset legend="Vehicle's Information">
        <FlexRow>
          <OutlinedTextField label="Model" />
          <OutlinedTextField label="Plate No." />
        </FlexRow>

        <FlexRow>
          <OutlinedTextField label="Motor No." />
          <OutlinedTextField label="Stroke" />
        </FlexRow>

        <FlexRow>
          <OutlinedTextField label="Chassis No." />
          <OutlinedTextField label="Fuel DISP.(cc)" />
        </FlexRow>
        <FlexRow>
          <OutlinedTextField label="OR No." />
          <OutlinedTextField label="CR No." />
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
          <OutlinedTextField label="TPL Provider" />

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
        </Box>
      </Fieldset>
      <Fieldset legend="Franchise Details">
        <FlexRow>
          <OutlinedTextField label="Type of Franchise" />
          <OutlinedTextField label="Kind of Business" />
        </FlexRow>

        <FlexRow>
          <OutlinedTextField label="TODA" />
          <OutlinedTextField label="Route" />
        </FlexRow>

        <OutlinedTextField label="Remarks" />
        <OutlinedTextField label="Complaints" />
      </Fieldset>
    </DialogForm>
  );
};

export default AddFranchiseForm;
