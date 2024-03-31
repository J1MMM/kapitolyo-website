import {
  Autocomplete,
  Box,
  Button,
  Checkbox,
  Chip,
  FormControl,
  FormControlLabel,
  FormHelperText,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import useData from "../../../hooks/useData";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import FlexRow from "../../common/ui/FlexRow";
import DialogForm from "../../common/ui/DialogForm";
import OutlinedTextField from "../../common/ui/OutlinedTextField";
import helper from "../../common/data/helper";
import { useTheme } from "@mui/material/styles";
import useViolations from "../../../api/useViolations";
import ConfirmationDialog from "../../common/ui/ConfirmationDialog";
import SnackBar from "../../common/ui/SnackBar";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const initialDetails = {
  ticketNo: "",
  dateApprehension: null,
  confiscatedDL: false,
  name: "",
  address: "",
  typeVehicle: "",
  franchiseNo: "",
  plateNo: "",
  timeViolation: "",
  placeViolation: "",
  officer: null,
  violation: [],
  paid: false,
  remarks: "",
  amount: "",
  or: "",
  orDate: "",
};

const AddViolators = ({ open, onClose }) => {
  const axiosPrivate = useAxiosPrivate();
  const { officersNames, violationsList, setViolations } = useData();

  const [disable, setDisable] = useState(false);
  const [violationDetails, setViolationDetails] = useState(initialDetails);
  const [confirmationShown, setConfirmationShown] = useState(false);
  const [selectedViolations, setPersonName] = useState([]);
  const [alertShown, setAlertShown] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState("success");
  const [alertMsg, setAlertMsg] = useState("");
  const theme = useTheme();

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setConfirmationShown(true);
  };

  const handleAddViolator = async () => {
    setDisable(true);
    try {
      const response = await axiosPrivate.post("violation", violationDetails);
      console.log(response.data);

      setViolations((prev) => {
        return [...prev, response.data];
      });

      setAlertSeverity("success");
      setAlertMsg("Violations Added Successfully");
      onClose(false);
      setViolationDetails(initialDetails);
    } catch (error) {
      setAlertSeverity("error");
      setAlertMsg("Error Adding Violations.");
      console.log(error);
    }
    setConfirmationShown(false);
    setAlertShown(true);
    setDisable(false);
  };

  return (
    <>
      <DialogForm
        onSubmit={handleSubmit}
        open={open}
        title="Add Violator"
        onClose={() => onClose(false)}
        actions={
          <>
            <Button
              disabled={disable}
              variant="outlined"
              size="small"
              onClick={() => onClose(false)}
            >
              cancel
            </Button>
            <Button
              disabled={disable}
              variant="contained"
              size="small"
              type="submit"
            >
              Submit
            </Button>
          </>
        }
      >
        <Box width={600}>
          <FlexRow>
            <OutlinedTextField
              required
              disabled={disable}
              label="Ticket No."
              value={violationDetails.ticketNo}
              onChange={(e) =>
                setViolationDetails((prev) => ({
                  ...prev,
                  ticketNo: e.target.value,
                }))
              }
            />
            <FormControl margin="dense" fullWidth required>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Date of Apprehension"
                  value={violationDetails.dateApprehension}
                  onChange={(date) =>
                    setViolationDetails((prev) => ({
                      ...prev,
                      dateApprehension: date,
                    }))
                  }
                  slotProps={{ textField: { required: true } }}
                />
              </LocalizationProvider>
            </FormControl>
          </FlexRow>
          <FormControlLabel
            sx={{ color: "gray", userSelect: "none" }}
            label="Confiscated D.L."
            control={
              <Checkbox
                value={violationDetails.confiscatedDL}
                onChange={(e) =>
                  setViolationDetails((prev) => ({
                    ...prev,
                    confiscatedDL: e.target.checked,
                  }))
                }
              />
            }
          />
          <FlexRow>
            <OutlinedTextField
              disabled={disable}
              label="Name of Violator"
              required
              value={violationDetails.name}
              onChange={(e) =>
                setViolationDetails((prev) => ({
                  ...prev,
                  name: e.target.value,
                }))
              }
            />
            <OutlinedTextField
              disabled={disable}
              label="Address"
              required
              value={violationDetails.address}
              onChange={(e) =>
                setViolationDetails((prev) => ({
                  ...prev,
                  address: e.target.value,
                }))
              }
            />
          </FlexRow>

          <FlexRow>
            <FormControl fullWidth margin="dense">
              <InputLabel>Type of Vehicle</InputLabel>
              <Select
                label="Type of Vehicle"
                value={violationDetails.typeVehicle}
                onChange={(e) =>
                  setViolationDetails((prev) => ({
                    ...prev,
                    typeVehicle: e.target.value,
                  }))
                }
              >
                <MenuItem value={"private"}>Private</MenuItem>
                <MenuItem value={"private"}>Private</MenuItem>
                <MenuItem value={"private"}>Private</MenuItem>
              </Select>
            </FormControl>

            <OutlinedTextField
              disabled={disable}
              label="Franchise No."
              value={violationDetails.franchiseNo}
              onChange={(e) =>
                setViolationDetails((prev) => ({
                  ...prev,
                  franchiseNo: e.target.value,
                }))
              }
            />
            <OutlinedTextField
              disabled={disable}
              label="Plate No."
              required
              value={violationDetails.plateNo}
              onChange={(e) =>
                setViolationDetails((prev) => ({
                  ...prev,
                  plateNo: e.target.value,
                }))
              }
            />
          </FlexRow>
          <FlexRow>
            <OutlinedTextField
              disabled={disable}
              label="Time of Violation"
              required
              value={violationDetails.timeViolation}
              onChange={(e) =>
                setViolationDetails((prev) => ({
                  ...prev,
                  timeViolation: e.target.value,
                }))
              }
            />
            <OutlinedTextField
              disabled={disable}
              label="Place of Violation"
              required
              value={violationDetails.placeViolation}
              onChange={(e) =>
                setViolationDetails((prev) => ({
                  ...prev,
                  placeViolation: e.target.value,
                }))
              }
            />
          </FlexRow>

          <Autocomplete
            options={officersNames}
            fullWidth
            value={violationDetails.officer}
            onChange={(_, value) =>
              setViolationDetails((prev) => ({
                ...prev,
                officer: value,
              }))
            }
            renderInput={(params) => (
              <TextField
                {...params}
                margin="dense"
                required
                label="Apprehending Officer"
              />
            )}
          />

          <FormControl fullWidth margin="dense" required>
            <InputLabel id="violations-committed">
              Violations Committed
            </InputLabel>
            <Select
              labelId="violations-committed"
              multiple
              value={selectedViolations}
              onChange={handleChange}
              input={<OutlinedInput label="Violations Committed" />}
              renderValue={(selected) => (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {selected.map((data) => (
                    <Chip key={data._id} label={data.violation} />
                  ))}
                </Box>
              )}
              MenuProps={MenuProps}
            >
              {violationsList.map((data) => (
                <MenuItem
                  key={data._id}
                  value={data}
                  style={getStyles(data.violation, selectedViolations, theme)}
                >
                  <Checkbox checked={selectedViolations.indexOf(data) > -1} />
                  {data.violation}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText sx={{ color: "primary.main", textAlign: "end" }}>
              {`Total Amount: ${selectedViolations.reduce(
                (total, obj) => total + obj["price"],
                0
              )}.00`}
            </FormHelperText>
          </FormControl>

          <FormControlLabel
            disabled={true}
            sx={{ color: "gray", userSelect: "none" }}
            control={
              <Checkbox
                value={violationDetails.paid}
                onChange={(e) =>
                  setViolationDetails((prev) => ({
                    ...prev,
                    paid: e.target.value,
                  }))
                }
              />
            }
            label="Mark as Paid"
          />

          <FlexRow>
            <OutlinedTextField
              disabled={disable}
              label="Remarks"
              value={violationDetails.remarks}
              onChange={(e) =>
                setViolationDetails((prev) => ({
                  ...prev,
                  remarks: e.target.value,
                }))
              }
            />
            <OutlinedTextField
              disabled={true}
              label="Amount Paid"
              required
              value={violationDetails.amount}
              onChange={(e) =>
                setViolationDetails((prev) => ({
                  ...prev,
                  amount: e.target.value,
                }))
              }
            />
          </FlexRow>

          <FlexRow>
            <OutlinedTextField disabled={true} label="OR Number" required />
            <OutlinedTextField disabled={true} label="OR Date" required />
          </FlexRow>
        </Box>
      </DialogForm>

      <ConfirmationDialog
        open={confirmationShown}
        setOpen={setConfirmationShown}
        confirm={handleAddViolator}
        title="Add Violation Confirmation"
        content="Are you sure you want to add this violation? Once confirmed, the data will be added to the system. Please note that if the franchise number already exists, the violation will be shown in the complaints field."
        disabled={disable}
      />

      <SnackBar
        open={alertShown}
        onClose={setAlertShown}
        severity={alertSeverity}
        msg={alertMsg}
      />
    </>
  );
};

export default AddViolators;
