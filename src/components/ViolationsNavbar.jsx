import { Box } from "@mui/material";
import React from "react";
import { NavLink } from "react-router-dom";

const ViolationsNavbar = () => {
  return (
    <Box
      paddingX={3}
      pr={5}
      mt={-2}
      ml={-3}
      bgcolor={"#FFF"}
      borderBottom={1}
      borderColor={"#E7EBF1"}
      display={"flex"}
      sx={{
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
      }}
    >
      <NavLink to="violations" className={"classroom-navigation"}>
        Violation
      </NavLink>
      <NavLink to="lessons" className={"classroom-navigation"}>
        Paid
      </NavLink>
      <NavLink to="archive" className={"classroom-navigation"}>
        Released TCT
      </NavLink>
    </Box>
  );
};

export default ViolationsNavbar;
