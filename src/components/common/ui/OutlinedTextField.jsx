import { TextField } from "@mui/material";
import React from "react";

function OutlinedTextField({
  label,
  value,
  onChange,
  readOnly,
  sx,
  required,
  InputProps,
  error,
  helperText,
}) {
  return (
    <TextField
      error={error}
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
      InputProps={InputProps}
      helperText={error && helperText}
    />
  );
}

export default OutlinedTextField;
