import { TextField } from "@mui/material";
import React from "react";

function OutlinedTextField({ label, value, onChange, readOnly, sx, required }) {
  return (
    <TextField
      margin="dense"
      type="text"
      variant="outlined"
      label={label}
      value={value}
      onChange={onChange}
      inputProps={{ readOnly: readOnly }}
      fullWidth
      required={required}
      sx={sx}
    />
  );
}

export default OutlinedTextField;
