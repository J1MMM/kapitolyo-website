import React, { useEffect, useState } from "react";
import UseRefreshToken from "../hooks/useRefreshToken";
import useAuth from "../hooks/useAuth";
import { Outlet } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import { Box, Typography } from "@mui/material";

import ctmo_logo from "../assets/images/logo2.png";

const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const refresh = UseRefreshToken();
  const { auth } = useAuth();

  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    !auth?.accessToken ? verifyRefreshToken() : setIsLoading(false);
  }, []);

  useEffect(() => {
    // console.log(`isLoading: ${isLoading}`);
    // console.log(`AcessToken:  ${JSON.stringify(auth?.accessToken)}`);
  }, [isLoading]);

  return (
    <>
      {isLoading ? (
        <Box
          sx={{
            display: "flex",
            width: "100%",
            height: "100vh",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            height={"100vh"}
            width={"100%"}
            display={"flex"}
            flexDirection={"column"}
            gap={5}
            justifyContent={"center"}
            alignItems={"center"}
            bgcolor="primary.main"
          >
            <Box
              sx={{
                position: "relative",
                width: "100%",
                height: "100%",
                maxHeight: 180,
                maxWidth: 180,
              }}
            >
              <img
                src={ctmo_logo}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </Box>
            <Typography
              variant="h5"
              color="secondary"
              fontWeight="500"
              letterSpacing="1px"
            >
              Loading please wait...
            </Typography>
          </Box>
        </Box>
      ) : (
        <Outlet />
      )}
    </>
  );
};

export default PersistLogin;
