import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
} from "@mui/material";
import React from "react";

function DialogForm({ open, onClose, title, actions, children }) {
  return (
    <Dialog open={open} onClose={onClose} disableAutoFocus maxWidth="md">
      <form>
        <DialogTitle
          variant="h5"
          bgcolor="primary.main"
          color="#FFF"
          fontWeight={500}
        >
          {title}
        </DialogTitle>
        <Divider />
        <DialogContent>{children}</DialogContent>
        <DialogActions>{actions}</DialogActions>
      </form>
    </Dialog>
  );
}

export default DialogForm;
