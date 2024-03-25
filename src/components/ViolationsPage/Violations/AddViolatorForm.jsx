import {
  Autocomplete,
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import useData from "../../../hooks/useData";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import FlexRow from "../../common/ui/FlexRow";
import DialogForm from "../../common/ui/DialogForm";
import OutlinedTextField from "../../common/ui/OutlinedTextField";
import mtops from "../../common/data/mtop";
import franchiseHelper from "../../common/data/franchiseHelper";
import violationsList from "../../common/data/violationsList";

const AddViolators = ({ open, onClose }) => {
  const axiosPrivate = useAxiosPrivate();
  const { franchises } = useData();
  const [disable, setDisable] = useState(false);
  const [franchiseDetails, setFranchiseDetails] = useState(
    franchiseHelper.initialFranchiseDetails
  );

  return (
    <DialogForm
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
            close
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
      <FlexRow>
        <OutlinedTextField required disabled={disable} label="Ticket No." />
        <FormControl margin="dense" fullWidth required>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker label="Date of Apprehension" />
          </LocalizationProvider>
        </FormControl>
      </FlexRow>
      <FormControlLabel
        sx={{ color: "gray", userSelect: "none" }}
        control={<Checkbox />}
        label="Confiscated D.L."
      />
      <FlexRow>
        <OutlinedTextField
          disabled={disable}
          label="Name of Violator"
          required
        />
        <OutlinedTextField disabled={disable} label="Address" required />
      </FlexRow>

      <FlexRow>
        <OutlinedTextField
          disabled={disable}
          label="Type of Vehicle"
          required
        />

        <Autocomplete
          disablePortal
          clearIcon={false}
          options={mtops}
          fullWidth
          value={franchiseDetails?.mtop}
          onInputChange={(_, value) =>
            setFranchiseDetails((prev) => ({
              ...prev,
              mtop: value || "",
            }))
          }
          renderInput={(params) => (
            <TextField {...params} margin="dense" label="Franchise No." />
          )}
        />

        <OutlinedTextField disabled={disable} label="Plate No." required />
      </FlexRow>
      <FlexRow>
        <OutlinedTextField
          disabled={disable}
          label="Time of Violation"
          required
        />
        <OutlinedTextField
          disabled={disable}
          label="Place of Violation"
          required
        />
      </FlexRow>

      <Autocomplete
        disablePortal
        clearIcon={false}
        options={mtops}
        fullWidth
        value={franchiseDetails?.officer}
        onInputChange={(_, value) =>
          setFranchiseDetails((prev) => ({
            ...prev,
            officer: value || "",
          }))
        }
        renderInput={(params) => (
          <TextField {...params} margin="dense" label="Apprehending Officer" />
        )}
      />
      <FormControlLabel
        disabled={true}
        sx={{ color: "gray", userSelect: "none" }}
        control={<Checkbox />}
        label="Mark as Paid"
      />
      <FlexRow>
        <OutlinedTextField disabled={disable} label="Remarks" required />
        <OutlinedTextField disabled={true} label="Amount Paid" required />
      </FlexRow>

      <FlexRow>
        <OutlinedTextField disabled={true} label="OR Number" required />
        <OutlinedTextField disabled={true} label="OR Date" required />
      </FlexRow>
    </DialogForm>
  );
};

export default AddViolators;
