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
          <OutlinedTextField 
          label="Middlename" 
          value={ownerMI}
          onChange={(e) => setOwnerMI(e.target.value)}
          />

          <OutlinedTextField 
          label="Lastname" 
          value={ownerLname}
          onChange={(e) => setOwnerLname(e.target.value)}
          />
        </Box>

        <FlexRow>
          <OutlinedTextField 
          label="Address" 
          value={ownerAddress}
          onChange={(e) => setOwnerAddress(e.target.value)}
          />
          <OutlinedTextField label="Contact Number" 
          value={ownerContact}
          onChange={(e) => setOwnerContact(e.target.value)}
          />
        </FlexRow>
      </Fieldset>

      <Fieldset legend="Driver's Information">
        <FlexRow>
          <OutlinedTextField label="Fullname" 
          value={driverFullname}
          onChange={(e) => setDriverFullname(e.target.value)}
          />
          <OutlinedTextField label="Contact Number" 
          value={driverContact}
          onChange={(e) => setDriverContact(e.target.value)}
          />
        </FlexRow>

        <OutlinedTextField label="Address" 
        value={driverAddress}
        onChange={(e) => setDriverAddress(e.target.value)}
        />
      </Fieldset>

      <Fieldset legend="Vehicle's Information">
        <FlexRow>
          <OutlinedTextField label="Model" 
          value={model}
          onChange={(e) => setModel(e.target.value)}
          />
          <OutlinedTextField 
          label="Plate No." 
          value={plateno}
          onChange={(e) => setPlateno(e.target.value)}
          />
        </FlexRow>

        <FlexRow>
          <OutlinedTextField label="Motor No." 
          value={motorno}
          onChange={(e) => setMotorno(e.target.value)}
          />
          <OutlinedTextField label="Stroke" 
          value={stroke}
          onChange={(e) => setStroke(e.target.value)}
          />
        </FlexRow>

        <FlexRow>
          <OutlinedTextField label="Chassis No." 
          value={chasisno}
          onChange={(e) => setChasisno(e.target.value)}
          />
          <OutlinedTextField label="Fuel DISP.(cc)" 
          value={fueldisp}
          onChange={(e) => setFueldisp(e.target.value)}
          />
        </FlexRow>
        <FlexRow>
          <OutlinedTextField 
          label="OR No." 
          value={OR}
          onChange={(e) => setOR(e.target.value)}
          />
          <OutlinedTextField 
          label="CR No." 
          value={CR}
          onChange={(e) => setCR(e.target.value)}
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
          value={tplProvider}
          onChange={(e) => setTplProvider(e.target.value)}
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
                value={tplDate1}
                onChange={(date) => setTplDate1(date)}
                />
              </LocalizationProvider>
              <Typography variant="subtitle1" color="grey">
                to
              </Typography>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker 
                slotProps={{ textField: { size: "small" } }}
                value={tplDate2}
                onChange={(date) => setTplDate2(date)}
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
          value={typeOfFranchise}
          onChange={(e) => setTypeOfFranchise(e.target.value)}
          />
          <OutlinedTextField 
          label="Kind of Business" 
          value={kindOfBusiness}
          onChange={(e) => setKindOfBusiness(e.target.value)}
          />
        </FlexRow>

        <FlexRow>
          <OutlinedTextField label="TODA" 
          value={toda}
          onChange={(e) => setToda(e.target.value)} 
          />
          <OutlinedTextField 
          label="Route" 
          value={route}
          onChange={(e) => setRoute(e.target.value)}
          />
        </FlexRow>

        <OutlinedTextField label="Remarks"          
        value={remarks}
        onChange={(e) => setRemarks(e.target.value)}
        />
        <OutlinedTextField label="Complaints" 
        value={complaints}
        onChange={(e) => setComplaints(e.target.value)}
        />
      </Fieldset>
    </DialogForm>
  );
};

export default AddFranchiseForm;
