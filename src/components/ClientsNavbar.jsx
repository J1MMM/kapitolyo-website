import { Box } from "@mui/material";
import React from "react";
import { NavLink } from "react-router-dom";

const ClientsNavbar = () => {
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
      <NavLink to="list" className={"classroom-navigation"}>
        Clients List
      </NavLink>
      <NavLink to="archive" className={"classroom-navigation"}>
        Archived
      </NavLink>
    </Box>
  );
};

export default ClientsNavbar;
