import {
  Close,
  CloseRounded,
  Print,
  PrintOutlined,
  PrintRounded,
} from "@mui/icons-material";
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
} from "@mui/material";
import React from "react";

function DialogForm({
  open,
  onClose,
  title,
  actions,
  children,
  achivedMode,
  printable,
}) {
  return (
    <Dialog
      open={open}
      disableAutoFocus
      maxWidth="md"
      sx={{ "&::-webkit-scrollbar": { display: "none" } }}
    >
      <form>
        <DialogTitle
          variant="h5"
          bgcolor="primary.main"
          color="#FFF"
          fontWeight={500}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          {title}

          <Box>
            {printable && (
              <IconButton>
                <PrintOutlined color="secondary" fontSize="large" />
              </IconButton>
            )}
            <IconButton onClick={onClose}>
              <CloseRounded color="secondary" fontSize="large" />
            </IconButton>
          </Box>
        </DialogTitle>
        <Divider />
        <DialogContent>{children}</DialogContent>
        <DialogActions>{actions}</DialogActions>
      </form>
    </Dialog>
  );
}

export default DialogForm;
