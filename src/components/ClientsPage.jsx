import { Box, Paper, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import ClientsNavbar from "./ClientsNavbar";

const ClientsPage = () => {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 2,
        borderRadius: 3,
        minHeight: "80vh",
      }}
    >
      <Box
        bgcolor="#fff"
        display="flex"
        justifyContent="space-between"
        pb={1}
        boxSizing="border-box"
        zIndex="99"
        sx={{
          flexDirection: {
            xs: "column",
            sm: "column",
            md: "row",
          },
          mb: {
            xs: 0,
            sm: 0,
            md: 2,
          },
        }}
      >
        <Box display={"flex"} flexDirection={"column"} gap={2} width={"100%"}>
          <ClientsNavbar />
          <Outlet />
        </Box>
      </Box>
    </Paper>
  );
};

export default ClientsPage;
