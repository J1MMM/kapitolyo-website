import React, { useEffect, useState } from "react";
import { Link, ScrollRestoration, useNavigate } from "react-router-dom";
import UseLogout from "../hooks/useLogout";
import useAuth from "../hooks/useAuth";
import { Box, Button, Grow, Paper, Slide, Typography } from "@mui/material";
import {
  HiOutlineUserGroup,
  HiMiniArrowSmallUp,
  HiMiniArrowUp,
} from "react-icons/hi2";
import {
  ArrowUpward,
  FolderShared,
  FolderSharedOutlined,
  NewReleases,
  Repeat,
} from "@mui/icons-material";
import { PiFolderSimpleUserDuotone, PiWarningCircle } from "react-icons/pi";
import useData from "../hooks/useData";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import NoServerResponse from "./NoServerResponse";
import ROLES_LIST from "./ROLES_LIST";
import cardBg from "../assets/images/cardBg.svg";
import OverviewCard from "./OverviewCard";
import "react-calendar/dist/Calendar.css";
import Users from "./Users";
import BarGraph from "./BarGraph";
import { RiEjectLine, RiUserAddLine } from "react-icons/ri";

const Dashboard = () => {
  const { allStudents, setAllStudents, setClasses, classes } = useData();
  const { auth } = useAuth();
  const axiosPrivate = useAxiosPrivate();

  const [noServerRes, setNoServerRes] = useState(false);
  const [studentsEmpty, setStudentsEmpty] = useState(false);

  const totalDyslexia = allStudents.filter(
    (student) =>
      student.archive == false &&
      student.learning_disabilities.includes("dyslexia")
  ).length;
  const totalDysgraphia = allStudents.filter(
    (student) =>
      student.archive == false &&
      student.learning_disabilities.includes("dysgraphia")
  ).length;
  const totalDyscalculia = allStudents.filter(
    (student) =>
      student.archive == false &&
      student.learning_disabilities.includes("dyscalculia")
  ).length;

  const isAdmin = Boolean(
    auth?.roles?.find((role) => role === ROLES_LIST.SuperAdmin)
  );
  if (isAdmin) {
    document.title = "Users Management";
    return <Users />;
  }

  useEffect(() => {
    document.title = "TRICYCLE FRANCHISING AND RENEWAL SYSTEM";
    window.scrollTo(0, 0);
    let isMounted = true;
    const controller = new AbortController();

    const getData = async () => {
      try {
      } catch (err) {
        setNoServerRes(true);
        console.error(err);
      }
    };

    getData();

    return () => {
      isMounted = false;
      isMounted && controller.abort();
    };
  }, []);

  const cardData = [
    {
      title: "Registered Clients",
      data: "10,789",
      icon: <HiOutlineUserGroup color={"#FFF"} size={20} />,
      subText: "Registered Clients in San Pablo City",
    },
    {
      title: "For Renewal",
      data: "5,482",
      icon: <Repeat color={"#150187"} size={20} sx={{ color: "#150187" }} />,
      subText: "total number of outdated farnchise",
    },
    {
      title: "Recently Added",
      data: "187",
      icon: <RiUserAddLine color={"#150187"} size={20} />,
      subText: "clients that have been added recently",
    },

    {
      title: "Recently Revoked",
      data: "25",
      icon: <PiWarningCircle color={"#150187"} size={20} />,
      subText: "total count of clients revoked",
    },
  ];

  const cardEl = cardData.map((data, index) => {
    return <OverviewCard key={index} data={data} index={index} />;
  });

  if (noServerRes) return <NoServerResponse show={noServerRes} />;
  return (
    <Box display="flex" flexDirection="column" padding={2}>
      <Box
        display={"grid"}
        gridTemplateColumns={"1fr 1fr"}
        gap={3}
        position={"relative"}
      >
        <Box
          display="grid"
          gap={2}
          flex={1}
          width={"100%"}
          // bgcolor="red"
          sx={{
            gridTemplateColumns: {
              xs: "1fr",
              sm: "1fr 1fr",
              md: "1fr 1fr",
            },
          }}
        >
          {cardEl}
        </Box>

        <BarGraph />
      </Box>
    </Box>
  );
};

export default Dashboard;
