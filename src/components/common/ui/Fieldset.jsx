import { Box } from "@mui/material";
import React from "react";

function Fieldset({ children, legend }) {
  return (
    <Box
      component={"fieldset"}
      sx={{
        border: "1px solid #150187",
        borderRadius: 2,
        mt: 2,
      }}
    >
      <legend style={{ color: "#150187" }}>{legend}</legend>
      {children}
    </Box>
  );
}

export default Fieldset;
