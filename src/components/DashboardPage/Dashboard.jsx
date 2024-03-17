import React, { useEffect, useState } from "react";
import { Link, ScrollRestoration, useNavigate } from "react-router-dom";
import UseLogout from "../../hooks/useLogout";
import useAuth from "../../hooks/useAuth";
import {
  Box,
  Button,
  CircularProgress,
  Grow,
  List,
  Paper,
  Slide,
  Typography,
} from "@mui/material";
import {
  HiOutlineUserGroup,
  HiMiniArrowSmallUp,
  HiMiniArrowUp,
} from "react-icons/hi2";
import {
  ArrowUpward,
  FileCopyOutlined,
  FolderShared,
  FolderSharedOutlined,
  ListAltOutlined,
  NewReleases,
  Repeat,
} from "@mui/icons-material";
import { PiFolderSimpleUserDuotone, PiWarningCircle } from "react-icons/pi";
import useData from "../../hooks/useData";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import NoServerResponse from "../common/ui/NoServerResponse";
import ROLES_LIST from "../common/data/ROLES_LIST";
import OverviewCard from "./OverviewCard";
import "react-calendar/dist/Calendar.css";
import BarGraph from "./BarGraph";
import { RiEjectLine, RiUserAddLine } from "react-icons/ri";
import Users from "../UsersAccountPage/Users";
import { BsTicket, BsTicketDetailedFill } from "react-icons/bs";
import useFranchises from "../../api/franchises";

const Dashboard = () => {
  const { auth } = useAuth();
  const { availableMTOP, franchises, franchisesLoading } = useData();

  const axiosPrivate = useAxiosPrivate();

  const [noServerRes, setNoServerRes] = useState(false);

  useEffect(() => {
    document.title = "Dashboard | TRICYCLE FRANCHISING AND RENEWAL SYSTEM";
    window.scrollTo(0, 0);
    let isMounted = true;
    const controller = new AbortController();

    const getData = async () => {
      try {
      } catch (err) {
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
      data: franchisesLoading ? (
        <CircularProgress color="secondary" />
      ) : (
        franchises.length
      ),
      icon: <HiOutlineUserGroup color={"#FFF"} size={20} />,
      subText: "Registered Clients in San Pablo City",
    },
    {
      title: "Available Franchises",
      data: availableMTOP.length,
      icon: (
        <ListAltOutlined
          color={"#1A237E"}
          size={20}
          sx={{ color: "#1A237E" }}
        />
      ),
      subText: "Total count of available MTOP",
    },
    {
      title: "Recently Added",
      data: "187",
      icon: <RiUserAddLine color={"#1A237E"} size={20} />,
      subText: "clients that have been added recently",
    },

    {
      title: "Recently Revoked",
      data: "25",
      icon: <PiWarningCircle color={"#1A237E"} size={20} />,
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
