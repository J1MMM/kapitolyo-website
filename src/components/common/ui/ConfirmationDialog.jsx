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
      <DialogContent component={"span"} dividers>
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
        <Box>
          <Button
            disabled={disabled}
            component={"span"}
            onClick={() => setOpen(false)}
            autoFocus
            sx={{ color: "grey" }}
          >
            Cancel
          </Button>
          <Button
            disabled={disabled}
            component={"span"}
            onClick={() => {
              confirm();
            }}
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
