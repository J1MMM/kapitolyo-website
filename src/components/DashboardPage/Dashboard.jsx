import React, { useEffect, useState } from "react";
import { Link, ScrollRestoration, useNavigate } from "react-router-dom";
import UseLogout from "../../hooks/useLogout";
import useAuth from "../../hooks/useAuth";
import {
  MdBookmarkAdd,
  MdOutlineBookmarkAdd,
  MdOutlineEventAvailable,
} from "react-icons/md";

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
  Checklist,
  ChecklistOutlined,
  FileCopyOutlined,
  FolderShared,
  FolderSharedOutlined,
  InfoOutlined,
  ListAltOutlined,
  NewReleases,
  Repeat,
} from "@mui/icons-material";
import {
  PiFolderSimpleUserDuotone,
  PiListBullets,
  PiListBulletsBold,
  PiListBulletsLight,
  PiWarningCircle,
} from "react-icons/pi";
import useData from "../../hooks/useData";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import NoServerResponse from "../common/ui/NoServerResponse";
import ROLES_LIST from "../common/data/ROLES_LIST";
import OverviewCard from "./OverviewCard";
import "react-calendar/dist/Calendar.css";
import BarGraph from "./BarGraph";
import { RiEjectLine, RiUserAddLine } from "react-icons/ri";
import Users from "../UsersAccountPage/Users";
import { BsList, BsTicket, BsTicketDetailedFill } from "react-icons/bs";
import useFranchises from "../../api/franchises";
import PageContainer from "../common/ui/PageContainer";
import TableLayout from "../common/ui/TableLayout";
import { FiList } from "react-icons/fi";
import PieGraph from "./PieGraph";
import { FaListOl } from "react-icons/fa6";
import LineGraph from "./lineGraph";
const Dashboard = () => {
  const { auth } = useAuth();
  const {
    availableMTOP,
    availableMTOPLoading,
    franchises,
    franchisesLoading,
    headerShadow,
    setHeaderShadow,
  } = useData();

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
      setHeaderShadow(false);
    };
  }, []);

  const cardData = [
    {
      title: "Registered Clients",
      data: franchisesLoading ? (
        <Typography
          component={"div"}
          display="flex"
          alignItems="center"
          gap={2}
        >
          <CircularProgress size={18} color="secondary" />
          loading...
        </Typography>
      ) : (
        franchises.length
      ),
      icon: <HiOutlineUserGroup color={"#FFF"} size={18} />,
      subText: "Registered Clients in San Pablo City",
    },
    {
      title: "Available Franchises",
      data: availableMTOPLoading ? (
        <Typography
          component={"div"}
          display="flex"
          alignItems="center"
          gap={2}
          color="primary"
        >
          <CircularProgress size={18} />
          loading...
        </Typography>
      ) : (
        availableMTOP.length
      ),
      icon: <FaListOl color={"#1A237E"} sx={{ color: "#1A237E" }} size={16} />,
      subText: "Total count of available MTOP",
    },
    {
      title: "Recently Added",
      data: "187",
      icon: <RiUserAddLine color={"#1A237E"} size={18} />,
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
    <Box
      height="100vh"
      maxHeight="90vh"
      sx={{ overflowY: "scroll", overflowX: "hidden" }}
      width="100%"
      onScroll={(e) => {
        if (e.target.scrollTop > 0 && !headerShadow) setHeaderShadow(true);
        if (e.target.scrollTop == 0 && headerShadow) setHeaderShadow(false);
      }}
    >
      <PageContainer>
        <TableLayout
          title="Dashboard"
          subTitle="Monitor Franchise and Violations Status"
        >
          <Box
            gap={2}
            width="100%"
            display="grid"
            sx={{
              gridTemplateColumns: {
                xs: "1fr",
                sm: "1fr 1fr",
                lg: "1fr 1fr 1fr 1fr",
              },
            }}
          >
            {cardEl}
          </Box>
          {/* <Box width="100%" display="flex" justifyContent="center">
            <BarGraph />
          </Box> */}
          <Box width="100%" display="flex" justifyContent="center">
            <LineGraph />
          </Box>

          {/* <Box
            display="flex"
            gap={2}
            width="100%"
            justifyContent="center"
            alignItems="center"
          >
            {cardEl}
          </Box>
          <Box width="100%" display="flex">
            <PieGraph />
          </Box> */}
        </TableLayout>
      </PageContainer>
    </Box>
  );
};

export default Dashboard;
