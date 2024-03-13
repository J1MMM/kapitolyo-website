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
  Paper,
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

const AddViolators = ({
  open,
  onClose,
  schoolYear,
  setSchoolYear,
  gradeLevel,
  setGradeLevel,
  section,
  setSection,
  setSnack,
  setSeverity,
  setResMsg,
}) => {
  const axiosPrivate = useAxiosPrivate();
  const { franchises } = useData();
  const [disable, setDisable] = useState(false);

  const handleSubmit = () => {};

  return (
    <Dialog
      open={open}
      onClose={() => onClose(false)}
      disableAutoFocus
      maxWidth="md"
    >
      <form onSubmit={handleSubmit}>
        <DialogTitle variant="h5" bgcolor="primary.main" color="#FFF">
          Add Violator
        </DialogTitle>
        <Divider />
        <DialogContent>
          <FlexRow>
            <TextField
              disabled={disable}
              margin="dense"
              label="Ticket No."
              type="text"
              variant="outlined"
            />
            <FormControl margin="dense">
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker label="Date of Appehension" />
              </LocalizationProvider>
            </FormControl>
          </FlexRow>

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
            <TextField
              disabled={disable}
              margin="dense"
              label="Apprehending Officer"
              type="text"
              fullWidth
              variant="outlined"
              required
            />
          </Box>

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
            <TextField
              disabled={disable}
              margin="dense"
              label="Confiscated D.L"
              type="text"
              fullWidth
              variant="outlined"
              required
            />
            <TextField
              disabled={true}
              margin="dense"
              label="OR No."
              type="text"
              fullWidth
              variant="outlined"
              required
            />
          </Box>

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
            <TextField
              disabled={disable}
              margin="dense"
              label="Name Of Violator"
              type="text"
              fullWidth
              variant="outlined"
              required
            />
            <TextField
              disabled={true}
              margin="dense"
              label="OR Date"
              type="text"
              fullWidth
              variant="outlined"
              required
            />
          </Box>

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
            <TextField
              disabled={disable}
              margin="dense"
              label="Address"
              type="text"
              fullWidth
              variant="outlined"
              required
            />
            <TextField
              disabled={true}
              margin="dense"
              label="Amount"
              type="text"
              fullWidth
              variant="outlined"
              required
            />
          </Box>
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
            <TextField
              disabled={disable}
              margin="dense"
              label="Type of Vehicle"
              type="text"
              fullWidth
              variant="outlined"
              required
            />
            <TextField
              disabled={disable}
              margin="dense"
              label="Remarks"
              type="text"
              fullWidth
              variant="outlined"
              required
            />
          </Box>
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
            <TextField
              disabled={disable}
              margin="dense"
              label="Tricycle Franchise No."
              type="text"
              fullWidth
              variant="outlined"
              required
            />
          </Box>
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
            <TextField
              disabled={disable}
              margin="dense"
              label="Plate No."
              type="text"
              fullWidth
              variant="outlined"
              required
            />
          </Box>
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
            <TextField
              disabled={disable}
              margin="dense"
              label="Time of Violation"
              type="text"
              fullWidth
              variant="outlined"
              required
            />
          </Box>
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
            <TextField
              disabled={disable}
              margin="dense"
              label="Place of Violation"
              type="text"
              fullWidth
              variant="outlined"
              required
            />
          </Box>
          <Box
            display="flex"
            gap={2}
            sx={{
              flexDirection: {
                xs: "column",
                sm: "row",
              },
            }}
          ></Box>
          {/* </Box> */}
        </DialogContent>
        <DialogActions>
          <Button
            disabled={disable}
            onClick={() => onClose(false)}
            color="inherit"
            sx={{ mb: 1 }}
          >
            <Typography>Cancel</Typography>
          </Button>
          <Button type="submit" disabled={disable} sx={{ mr: 1, mb: 1 }}>
            {disable && <CircularProgress size={16} color="inherit" />}{" "}
            <Typography component={"span"} ml={1}>
              {disable ? "Loading..." : "Submit"}
            </Typography>
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default AddViolators;
