import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Typography,
} from "@mui/material";
import React from "react";

const ConfirmationDialog = ({
  open,
  setOpen,
  title,
  content,
  confirm,
  disabled,
}) => {
  return (
    <Dialog
      open={open}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      component={"span"}
    >
      <DialogTitle
        component={"span"}
        id="alert-dialog-title"
        variant="h6"
        fontWeight="500"
      >
        {title}
      </DialogTitle>
      <Divider />
      <DialogContent component={"span"}>
        <DialogContentText component={"span"} id="alert-dialog-description">
          <Alert
            component={"span"}
            sx={{ maxWidth: "500px" }}
            severity="warning"
          >
            <Typography variant="body1">{content}</Typography>
          </Alert>
        </DialogContentText>
      </DialogContent>
      <DialogActions component={"span"}>
        <Box display="flex" gap={2} p={1} pt={0} pr={2} pb={2}>
          <Button
            disabled={disabled}
            component={"span"}
            size="small"
            onClick={() => setOpen(false)}
            color="inherit"
            variant="outlined"
            autoFocus
          >
            Cancel
          </Button>
          <Button
            disabled={disabled}
            variant="outlined"
            component={"span"}
            size="small"
            onClick={() => {
              confirm();
            }}
            color="warning"
          >
            {disabled ? (
              <Box display="flex" alignItems="center" gap={2}>
                <CircularProgress size={18} color="inherit" />
                <span>Loading...</span>
              </Box>
            ) : (
              <span>Confirm</span>
            )}
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationDialog;
