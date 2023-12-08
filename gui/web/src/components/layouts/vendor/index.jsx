import { Box, styled } from "@mui/material";
import { Fragment, useState } from "react";
import DashboardNavbar from "../DashboardNavbar";
import DashboardSidebar from "./DashboardSidebar";
import Authenticate from "../../Authenticate";

const BodyWrapper = styled(Box)(({ theme }) => ({
  transition: "margin-left 0.3s",
  marginLeft: "280px",
  [theme.breakpoints.down("lg")]: {
    marginLeft: 0,
  },
}));

const InnerWrapper = styled(Box)(({ theme }) => ({
  transition: "all 0.3s",
  [theme.breakpoints.up("lg")]: {
    maxWidth: 1200,
    margin: "auto",
  },
  [theme.breakpoints.down(1550)]: {
    paddingLeft: "2rem",
    paddingRight: "2rem",
  },
}));

const VendorDashboardLayout = ({ children }) => {
  const [showMobileSideBar, setShowMobileSideBar] = useState(0);

  // handle sidebar toggle in mobile device
  const handleMobileDrawerToggle = () =>
    setShowMobileSideBar((state) => (state ? 0 : 1));

  return (
    <Authenticate>
      <Fragment>
        <DashboardSidebar
          showMobileSideBar={showMobileSideBar}
          setShowMobileSideBar={handleMobileDrawerToggle}
        />

        <BodyWrapper>
          <DashboardNavbar handleDrawerToggle={handleMobileDrawerToggle} />
          <InnerWrapper>{children}</InnerWrapper>
        </BodyWrapper>
      </Fragment>
    </Authenticate>
  );
};
export default VendorDashboardLayout;
