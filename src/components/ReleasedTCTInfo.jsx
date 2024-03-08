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
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useData from "../hooks/useData";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

const ReleasedTCTInfo = ({
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
  const { setClasses } = useData();
  const [disable, setDisable] = useState(false);

  const handleCreateClass = async (e) => {
    setDisable(true);
    e.preventDefault();

    if (!section || !gradeLevel || !schoolYear) {
      setResMsg("All Fields are required");
      setSeverity("error");
      setSnack(true);
      setDisable(false);
      return;
    }

    if (section.length > 30) {
      setResMsg(
        '"Oops! It looks like your text is a bit too long. Please keep it within 30 characters.'
      );
      setSeverity("error");
      setSnack(true);
      setDisable(false);
      return;
    }

    try {
      const response = await axiosPrivate.post("/class", {
        section: section.trimStart().trimEnd(),
        gradeLevel: gradeLevel,
        schoolYear: schoolYear,
      });

      setResMsg(response.data.success);
      setSeverity("success");
      setSnack(true);
      setClasses((prev) => [...prev, response.data.result]);
    } catch (error) {
      setDisable(false);
    }
    onClose(false);
    setSection("");
    setGradeLevel(1);
    setSchoolYear(new Date());
    setDisable(false);
  };

  return (
    <Dialog
      open={open}
      onClose={() => onClose(false)}
      disableAutoFocus
      maxWidth="xl"
    >
      <form onSubmit={handleCreateClass}>
        <DialogTitle variant="h5" bgcolor="primary.main" color="#FFF">
          Released TCT
        </DialogTitle>
        <Divider />
        <DialogContent>
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
              id="section"
              label="Last Name"
              type="text"
              fullWidth
              variant="outlined"
              required
            />
            <TextField
              disabled={disable}
              margin="dense"
              id="section"
              label="First Name"
              type="text"
              fullWidth
              variant="outlined"
              required
            />
            <TextField
              disabled={disable}
              margin="dense"
              id="section"
              label="M.I"
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
              id="section"
              label="TCT No. Series"
              type="text"
              fullWidth
              variant="outlined"
              required
            />
            <TextField
              disabled={disable}
              margin="dense"
              id="section"
              label="Date of Release"
              type="text"
              fullWidth
              variant="outlined"
              required
            />
          </Box>

          
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

export default ReleasedTCTInfo;
