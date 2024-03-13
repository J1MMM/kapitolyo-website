import React, { useEffect, useState } from "react";
import { NavLink, Navigate, Outlet, useNavigate } from "react-router-dom";
import Navbar from "../Navbar";
import { BsGraphUpArrow } from "react-icons/bs";
import useAuth from "../../hooks/useAuth";
import {
  Box,
  Chip,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { CloseRounded, Logout, MenuRounded } from "@mui/icons-material";
import { FiLogOut, FiUser, FiUsers } from "react-icons/fi";
import { HiOutlineArchiveBox } from "react-icons/hi2";
import UseLogout from "../../hooks/useLogout";
import ROLES_LIST from "../common/data/ROLES_LIST";
import UserAvatar from "../common/ui/UserAvatar";
import ConfirmationDialog from "../common/ui/ConfirmationDialog";
import Logo1 from "../../assets/images/logo1.png";
import Logo2 from "../../assets/images/logo2.png";
import { PiUserList } from "react-icons/pi";
import { RiFolderWarningLine } from "react-icons/ri";
import "./style.scss";

const Layout = () => {
  const { auth } = useAuth();

  const [navOpen, setNavOpen] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [headerShadow, setHeaderShadow] = useState(false);
  const fullname = auth?.fullname || undefined;
  const email = auth?.email || undefined;
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const navigate = useNavigate();
  const logout = UseLogout();

  const isAdmin = Boolean(
    auth?.roles?.find((role) => role === ROLES_LIST.SuperAdmin)
  );

  const signout = async () => {
    await logout();
    setOpenDialog(false);
    navigate("/login", { replace: true });
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setHeaderShadow(true);
      } else {
        setHeaderShadow(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  });

  if (!auth?.fullname) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="layout">
      <div className={headerShadow ? "header shadow" : "header"}>
        <Box
          display="flex"
          alignItems="center"
          gap={2}
          boxSizing={"border-box"}
        >
          <IconButton
            onClick={() => setNavOpen((prev) => !prev)}
            sx={{ display: { xs: "none", md: "flex" } }}
          >
            <MenuRounded color="secondary" />
          </IconButton>
          <Box className={"nav-logo"}>
            <Box
              sx={{
                height: "80px",
                display: {
                  xs: "none",
                  sm: "none",
                  md: "flex",
                },
                p: 1,
                boxSizing: "border-box",
                gap: 1,
              }}
            >
              <img src={Logo1} />
              <img src={Logo2} />
            </Box>
            <Typography
              variant="h5"
              fontWeight={"500"}
              sx={{
                fontSize: {
                  xs: "medium",
                  sm: "medium",
                  md: "larger",
                },
              }}
            >
              TRICYCLE FRANCHISING AND RENEWAL SYSTEM
            </Typography>
          </Box>
        </Box>

        {/* mobile view nav  */}
        <IconButton
          onClick={handleClick}
          sx={{
            display: {
              md: "none",
            },
          }}
        >
          {anchorEl ? (
            <CloseRounded color="secondary" />
          ) : (
            <MenuRounded color="secondary" />
          )}
        </IconButton>

        <Box
          mr={1}
          alignItems="center"
          sx={{
            display: {
              xs: "none",
              sm: "none",
              md: "flex",
            },
          }}
        >
          {fullname && (
            <IconButton onClick={handleClick}>
              <Box
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
                borderRadius={50}
                bgcolor={"#FFF"}
                height={"38px"}
                width={"38px"}
              >
                <FiUser size={22} />
              </Box>
            </IconButton>
          )}
          <Box
            display={"flex"}
            flexDirection={"column"}
            alignItems={"flex-start"}
            justifyContent={"center"}
          >
            <Typography
              component={"span"}
              variant="body2"
              fontWeight={600}
              pb={-1}
            >
              {fullname}
            </Typography>
            <Typography
              component={"span"}
              variant="caption"
              fontSize={"x-small"}
              color={"#FFF"}
            >
              {email}
            </Typography>
          </Box>
        </Box>
      </div>

      <div className={navOpen ? "main-container" : "main-container nav-close"}>
        <Navbar
          openDialog={openDialog}
          setOpenDialog={setOpenDialog}
          navOpen={navOpen}
        />

        <div className={"outlet-container"}>
          <Outlet />
        </div>
      </div>

      <ConfirmationDialog
        title="Confirm Logout"
        confirm={signout}
        content="Are you sure you want to Logout?"
        open={openDialog}
        setOpen={setOpenDialog}
      />

      <Menu
        sx={{ mt: 2 }}
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <Box
          minWidth="250px"
          display="flex"
          flexDirection="column"
          alignItems="center"
          // border="1px solid red"
          pt={5}
          sx={{
            mb: {
              xs: 1,
              sm: 1,
              md: 5,
            },
          }}
        >
          <Box
            bgcolor="primary.main"
            width="100%"
            height="100px"
            position="absolute"
            zIndex="1"
            top="-8px"
            left="0"
          />

          <UserAvatar
            fullname={auth.fullname}
            height="70px"
            width="70px"
            border="3px solid #FFF"
            fontSize="2rem"
          />
          <Typography zIndex="2" variant="h6" mt={1}>
            {fullname}
          </Typography>
          <Typography zIndex="2" variant="caption">
            {email}
          </Typography>

          <Box mt={2} display="flex" alignItems="center" gap={1}>
            {auth.roles.map((role, index) => {
              if (role === 0) return;
              return (
                role && (
                  <Chip
                    key={index}
                    label={Object.keys(ROLES_LIST).find(
                      (key) => ROLES_LIST[key] == role
                    )}
                    color="primary"
                    size="small"
                  />
                )
              );
            })}
          </Box>
        </Box>

        <nav style={{ display: "none " }} className="navbar-nav menu-nav">
          <NavLink to="/" className={"open mobile"}>
            {isAdmin ? (
              <>
                <FiUsers size={24} />
                <Typography component={"span"} className={"active"}>
                  Users
                </Typography>
              </>
            ) : (
              <>
                <BsGraphUpArrow size={20} />
                <Typography component={"span"} className={"active"}>
                  Dashboard
                </Typography>
              </>
            )}
          </NavLink>

          {!isAdmin && (
            <NavLink to="clients" className={"open mobile"}>
              <PiUserList size={26} />
              <Typography component={"span"} className={"active"}>
                Clients
              </Typography>
            </NavLink>
          )}
          {!isAdmin && (
            <NavLink to="violations" className={"open mobile"}>
              <RiFolderWarningLine size={26} />
              <Typography component={"span"} className={"active"}>
                Violations
              </Typography>
            </NavLink>
          )}
          {isAdmin && (
            <NavLink to="user-archive" className={"open mobile"}>
              <HiOutlineArchiveBox size={26} />
              <Typography component={"span"} className={"active"}>
                Archive
              </Typography>
            </NavLink>
          )}
        </nav>

        <MenuItem
          sx={{
            p: 1,
            display: {
              xs: "none",
              sm: "none",
              md: "flex",
            },
          }}
          onClick={() => setOpenDialog(true)}
        >
          <ListItemIcon sx={{ ml: 7 }}>
            <Logout />
          </ListItemIcon>
          <Typography>Logout </Typography>
        </MenuItem>

        <button
          style={{ display: "none" }}
          className="sign-out-btn menu-logout-btn"
          onClick={() => setOpenDialog(true)}
        >
          <FiLogOut size={22} />
          <span>Logout</span>
        </button>
      </Menu>
    </div>
  );
};

export default Layout;
