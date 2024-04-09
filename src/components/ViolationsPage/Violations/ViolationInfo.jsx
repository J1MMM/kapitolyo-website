import {
  Autocomplete,
  Box,
  Button,
  Checkbox,
  Chip,
  Collapse,
  FormControl,
  FormControlLabel,
  FormHelperText,
  IconButton,
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
import {
  DatePicker,
  DesktopTimePicker,
  LocalizationProvider,
} from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import FlexRow from "../../common/ui/FlexRow";
import DialogForm from "../../common/ui/DialogForm";
import OutlinedTextField from "../../common/ui/OutlinedTextField";
import helper from "../../common/data/helper";
import { useTheme } from "@mui/material/styles";
import useViolations from "../../../api/useViolations";
import ConfirmationDialog from "../../common/ui/ConfirmationDialog";
import SnackBar from "../../common/ui/SnackBar";
import Vhelper from "./Vhelper";
import { Clear } from "@mui/icons-material";

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

const ViolationsInfo = ({
  open,
  onClose,
  violationDetails,
  setViolationDetails,
  initialViolationDetails,
}) => {
  const axiosPrivate = useAxiosPrivate();
  const { officersNames, violationsList, setViolations } = useData();
  const [disable, setDisable] = useState(false);
  const [confirmationShown, setConfirmationShown] = useState(false);
  const [readOnly, setReadOnly] = useState(true);
  const [alertShown, setAlertShown] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState("success");
  const [alertMsg, setAlertMsg] = useState("");
  const [editAlertShown, setEditAlertShown] = useState(false);
  const [closingAlert, setClosingAlert] = useState(false);
  const [updateConfirmation, setUpdateConfirmation] = useState(false);

  const theme = useTheme();

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setViolationDetails((prev) => ({ ...prev, violation: value }));
  };

  const handleSubmit = async () => {
    setDisable(true);
    try {
      const response = await axiosPrivate.put("/violation", violationDetails);
      console.log(response.data);
      setViolations((prev) => {
        return prev?.map((obj) => {
          if (obj._id == violationDetails._id) {
            return response.data;
          } else {
            return obj;
          }
        });
      });
      setReadOnly(true);
      setAlertSeverity("success");
      setAlertMsg("Violations Updated Successfully");
      onClose(false);
      setViolationDetails(Vhelper.initialDetails);
    } catch (error) {
      setAlertSeverity("error");
      setAlertMsg("Update Violations Error.");
      console.log(error);
    }
    setAlertShown(true);
    setUpdateConfirmation(false);
    setDisable(false);
  };

  const handleClose = () => {
    if (!readOnly && initialViolationDetails != violationDetails) {
      setClosingAlert(true);
      return;
    }
    onClose(false);
    setReadOnly(true);
    setViolationDetails(Vhelper.initialDetails);
  };

  return (
    <>
      <DialogForm
        open={open}
        title={readOnly ? "Violations Info" : "Update Violation"}
        onClose={handleClose}
        onSubmit={(e) => {
          e.preventDefault();
          setUpdateConfirmation(true);
        }}
        actions={
          <>
            <Collapse
              in={readOnly}
              mountOnEnter
              unmountOnExit
              timeout={readOnly ? 300 : 0}
            >
              <Box display="flex" gap={1}>
                <Button
                  disabled={disable}
                  variant="outlined"
                  size="small"
                  onClick={handleClose}
                >
                  cancel
                </Button>
                <Button
                  disabled={disable}
                  variant="contained"
                  size="small"
                  onClick={() => {
                    helper.handleScrollToTop();
                    setReadOnly(false);
                    setEditAlertShown(true);
                    setViolationDetails((prev) => ({ ...prev, violation: [] }));
                  }}
                >
                  Edit
                </Button>
              </Box>
            </Collapse>

            <Collapse
              in={!readOnly}
              mountOnEnter
              unmountOnExit
              timeout={!readOnly ? 300 : 0}
            >
              <Box display="flex" gap={1}>
                <Button
                  disabled={disable}
                  variant="outlined"
                  size="small"
                  onClick={handleClose}
                >
                  cancel
                </Button>
                <Button
                  disabled={
                    disable || violationDetails == initialViolationDetails
                  }
                  variant="contained"
                  size="small"
                  type="submit"
                >
                  Submit
                </Button>
              </Box>
            </Collapse>
          </>
        }
      >
        <Box width={600}>
          <FlexRow>
            <OutlinedTextField
              readOnly={readOnly}
              required
              disabled={disable}
              label="Ticket No."
              value={violationDetails?.ticketNo}
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
                  readOnly={readOnly}
                  label="Date of Apprehension"
                  slotProps={{ textField: { required: true } }}
                  value={new Date(violationDetails?.dateApprehension)}
                  onChange={(date) =>
                    setViolationDetails((prev) => ({
                      ...prev,
                      dateApprehension: date,
                    }))
                  }
                />
              </LocalizationProvider>
            </FormControl>
          </FlexRow>

          <FlexRow>
            <OutlinedTextField
              disabled={disable}
              label="Name of Violator"
              required
              readOnly={readOnly}
              value={violationDetails?.name}
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
              readOnly={readOnly}
              value={violationDetails?.address}
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
                readOnly={readOnly}
                label="Type of Vehicle"
                IconComponent={
                  violationDetails.typeVehicle.length > 1
                    ? () => (
                        <IconButton
                          disabled={readOnly}
                          size="small"
                          sx={{ mr: 1 }}
                          onClick={(e) => {
                            setViolationDetails((prev) => ({
                              ...prev,
                              typeVehicle: "",
                            }));
                          }}
                        >
                          <Clear fontSize="small" />
                        </IconButton>
                      )
                    : undefined
                }
                value={violationDetails?.typeVehicle}
                onChange={(e) =>
                  setViolationDetails((prev) => ({
                    ...prev,
                    typeVehicle: e.target.value,
                  }))
                }
              >
                <MenuItem value={"Tricycle (MTC)"}>Tricycle (MTC)</MenuItem>
                <MenuItem value={"Private"}>Private</MenuItem>
                <MenuItem value={"MC"}>MC</MenuItem>
                <MenuItem value={"PUJ"}>PUJ</MenuItem>
                <MenuItem value={"UV"}>UV</MenuItem>
                <MenuItem value={"Truck/Bus"}>Truck/Bus</MenuItem>
              </Select>
            </FormControl>

            <OutlinedTextField
              disabled={disable}
              label="Franchise No."
              value={violationDetails?.franchiseNo}
              readOnly={readOnly}
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
              readOnly={readOnly}
              value={violationDetails?.plateNo}
              onChange={(e) =>
                setViolationDetails((prev) => ({
                  ...prev,
                  plateNo: e.target.value,
                }))
              }
            />
          </FlexRow>

          <FlexRow>
            <FormControl fullWidth margin="dense">
              <InputLabel>Confiscated D.L.</InputLabel>
              <Select
                disabled={disable}
                readOnly={readOnly}
                label="Confiscated D.L."
                IconComponent={
                  violationDetails.confiscatedDL.length > 1
                    ? () => (
                        <IconButton
                          disabled={readOnly}
                          size="small"
                          sx={{ mr: 1 }}
                          onClick={(e) => {
                            setViolationDetails((prev) => ({
                              ...prev,
                              confiscatedDL: "",
                            }));
                          }}
                        >
                          <Clear fontSize="small" />
                        </IconButton>
                      )
                    : undefined
                }
                value={violationDetails.confiscatedDL}
                onChange={(e) =>
                  setViolationDetails((prev) => ({
                    ...prev,
                    confiscatedDL: e.target.value,
                  }))
                }
              >
                <MenuItem value={"Student"}>Student</MenuItem>
                <MenuItem value={"Non Pro"}>Non Pro</MenuItem>
                <MenuItem value={"Pro"}>Pro</MenuItem>
                <MenuItem value={"Temporary DL"}>Temporary DL</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth margin="dense">
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DesktopTimePicker
                  readOnly={readOnly}
                  label="Time of Violation"
                  value={new Date(violationDetails.timeViolation)}
                  onChange={(newValue) => {
                    setViolationDetails((prev) => ({
                      ...prev,
                      timeViolation: newValue,
                    }));
                  }}
                  slotProps={{ textField: { variant: "outlined" } }}
                />
              </LocalizationProvider>
            </FormControl>

            <OutlinedTextField
              disabled={disable}
              label="Place of Violation"
              readOnly={readOnly}
              value={violationDetails?.placeViolation}
              onChange={(e) =>
                setViolationDetails((prev) => ({
                  ...prev,
                  placeViolation: e.target.value,
                }))
              }
            />
          </FlexRow>

          <Autocomplete
            clearIcon={false}
            readOnly={readOnly}
            options={officersNames}
            fullWidth
            value={violationDetails?.officer || null}
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
                label="Apprehending Officer"
              />
            )}
          />

          <FormControl fullWidth margin="dense" required>
            <InputLabel id="violations-committed">
              Violations Committed
            </InputLabel>
            <Select
              readOnly={readOnly}
              labelId="violations-committed"
              multiple
              value={violationDetails.violation}
              onChange={handleChange}
              input={<OutlinedInput label="Violations Committed" />}
              renderValue={(selected) => (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {selected.map((data, i) => (
                    <Chip key={i} label={data.violation} />
                  ))}
                </Box>
              )}
              MenuProps={MenuProps}
            >
              {violationsList.map((data, i) => (
                <MenuItem key={i} value={data}>
                  <Checkbox
                    checked={violationDetails.violation.indexOf(data) > -1}
                  />
                  {data.violation}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText
              sx={{
                color: "error.main",
                textAlign: "end",
                fontSize: "medium",
              }}
            >
              {`Total Amount: ${violationDetails.violation?.reduce(
                (total, obj) => total + obj["price"],
                0
              )}.00`}
            </FormHelperText>
          </FormControl>

          <FlexRow>
            <OutlinedTextField
              disabled={disable}
              label="Remarks"
              value={violationDetails?.remarks}
              onChange={(e) =>
                setViolationDetails((prev) => ({
                  ...prev,
                  remarks: e.target.value,
                }))
              }
              readOnly={readOnly}
            />
            <OutlinedTextField
              disabled={true}
              label="Amount Paid"
              readOnly={readOnly}
              value={violationDetails?.amount}
              onChange={(e) =>
                setViolationDetails((prev) => ({
                  ...prev,
                  amount: e.target.value,
                }))
              }
            />
          </FlexRow>

          <FlexRow>
            <OutlinedTextField
              disabled={true}
              label="OR Number"
              value={violationDetails?.or}
              readOnly={readOnly}
              onChange={(e) =>
                setViolationDetails((prev) => ({ ...prev, or: e.target.value }))
              }
            />
            <OutlinedTextField
              disabled={true}
              label="OR Date"
              readOnly={readOnly}
              value={violationDetails?.orDate}
              onChange={(e) =>
                setViolationDetails((prev) => ({
                  ...prev,
                  orDate: e.target.value,
                }))
              }
            />
          </FlexRow>
        </Box>
      </DialogForm>

      <ConfirmationDialog
        open={closingAlert}
        setOpen={setClosingAlert}
        confirm={() => {
          setClosingAlert(false);
          setReadOnly(true);
          setViolationDetails(initialViolationDetails);
          helper.handleScrollToTop();
        }}
        title="Confirmation"
        content="Closing this form will discard all the data you have entered into the input fields. Are you sure you want to close it?"
        label="Yes, close it"
      />

      <ConfirmationDialog
        open={updateConfirmation}
        setOpen={setUpdateConfirmation}
        confirm={handleSubmit}
        title="Update Confirmation"
        content="Before proceeding, kindly confirm the update of violators information. Your changes will be saved upon submission."
        disabled={disable}
      />

      <SnackBar
        open={alertShown}
        onClose={setAlertShown}
        severity={alertSeverity}
        msg={alertMsg}
      />

      <SnackBar
        open={editAlertShown}
        onClose={setEditAlertShown}
        msg="Please provide the necessary details below. Ensure all information is accurate before submitting."
        severity={"info"}
        position={{ horizontal: "center", vertical: "top" }}
      />
    </>
  );
};

export default ViolationsInfo;
