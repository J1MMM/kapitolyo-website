import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import ROLES_LIST from "../ROLES_LIST";
import { FiUsers, FiList, FiArchive } from "react-icons/fi";
import { Typography } from "@mui/material";
import { BsArchive, BsGraphUpArrow } from "react-icons/bs";
import useData from "../../hooks/useData";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import "./style.scss";
import { PiUserList, PiUserListLight } from "react-icons/pi";
import { RiFolderWarningLine } from "react-icons/ri";
import { Archive } from "@mui/icons-material";

const Navbar = ({ navOpen }) => {
  const axiosPrivate = useAxiosPrivate();
  const { classes, setClasses } = useData();
  const { auth } = useAuth();
  const isAdmin = Boolean(
    auth?.roles?.find((role) => role === ROLES_LIST.SuperAdmin)
  );

  // useEffect(() => {
  //     const getClasses = async () => {
  //         try {
  //             const response = await axiosPrivate.get('/class');

  //             setClasses(response.data.filter(item => item.archive == false))
  //         } catch (err) {
  //             console.log(err);
  //         }
  //     }

  //     if (classes.length == 0) {
  //         getClasses()
  //     }

  // }, [])

  return (
    <div className="navbar">
      <nav className="navbar-nav">
        <NavLink to="/" className={navOpen ? "open" : ""}>
          {isAdmin ? (
            <>
              <FiUsers size={24} />
              <Typography
                component={"span"}
                className={navOpen ? "active" : ""}
              >
                Users
              </Typography>
            </>
          ) : (
            <>
              <BsGraphUpArrow size={20} />
              <Typography
                component={"span"}
                className={navOpen ? "active" : ""}
              >
                Dashboard
              </Typography>
            </>
          )}
        </NavLink>

        {isAdmin && (
          <NavLink to={"user-archive"} className={navOpen ? "open" : ""}>
            <BsArchive size={24} />
            <Typography component={"span"} className={navOpen ? "active" : ""}>
              Archived
            </Typography>
          </NavLink>
        )}
        {!isAdmin && (
          <>
            <NavLink to="clients" className={navOpen ? "open" : ""}>
              <PiUserList size={26} />
              <Typography
                component={"span"}
                className={navOpen ? "active" : ""}
              >
                Clients
              </Typography>
            </NavLink>
            <NavLink to="violations" className={navOpen ? "open" : ""}>
              <RiFolderWarningLine size={26} />
              <Typography
                component={"span"}
                className={navOpen ? "active" : ""}
              >
                Violations
              </Typography>
            </NavLink>
          </>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
