import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
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

const AddFranchiseForm = ({
  open,
  onClose,
  setSnack,
  setSeverity,
  setResMsg,
  clientDetails,
  printable,
}) => {
  const axiosPrivate = useAxiosPrivate();
  const { franchises, availableMTOP, setAvailableMTOP } = useData();
  const [disable, setDisable] = useState(false);
  const [mtop, setMtop] = useState("");

  const availableMtopEl = availableMTOP.map((mtop) => {
    return <MenuItem value={mtop}>{mtop}</MenuItem>;
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
          <InputLabel id="gender">MTOP</InputLabel>
          <Select
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
            <DatePicker label="Date Renewal" readOnly />
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
          <OutlinedTextField label="Firstname" />
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
