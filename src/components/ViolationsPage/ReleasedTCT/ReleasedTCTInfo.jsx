import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

const ReleasedTCTInfo = ({
  open,
  onClose,

}) => {
  const [disable, setDisable] = useState(false);

  const handleCreateClass = async (e) => {

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
