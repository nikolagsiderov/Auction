import { useRouter } from "next/router";
import { Public, LegendToggle } from "@mui/icons-material";
import {
  Box,
  Button,
  styled,
  useMediaQuery,
  AppBar,
  Toolbar,
  Container,
} from "@mui/material";
import AccountPopover from "../popovers/AccountPopover";
import { FlexBox, FlexRowCenter } from "components/flex-box";
import NotificationsPopover from "../popovers/NoficationPopover";

const DashboardNavbarRoot = styled(AppBar)(({ theme }) => ({
  zIndex: 11,
  paddingTop: "1rem",
  paddingBottom: "1rem",
  backgroundColor: "#ffffff",
  boxShadow: theme.shadows[2],
  color: theme.palette.secondary.main,
}));

const StyledToolBar = styled(Toolbar)({
  "@media (min-width: 0px)": {
    paddingLeft: 0,
    paddingRight: 0,
    minHeight: "auto",
  },
});

const ToggleWrapper = styled(FlexRowCenter)(({ theme }) => ({
  width: 40,
  height: 40,
  flexShrink: 0,
  cursor: "pointer",
  borderRadius: "8px",
  backgroundColor: theme.palette.text.disabled,
}));

const CustomButton = styled(Button)(({ theme }) => ({
  minHeight: 40,
  flexShrink: 0,
  marginLeft: 16,
  padding: "0 20px",
  borderRadius: "8px",
  backgroundColor: theme.palette.text.disabled,
  [theme.breakpoints.down("xs")]: {
    display: "none",
  },
  textTransform: "none",
}));

const DashboardNavbar = ({ handleDrawerToggle }) => {
  const router = useRouter();
  const downLg = useMediaQuery((theme) => theme.breakpoints.down("lg"));
  return (
    <DashboardNavbarRoot position="sticky">
      <Container maxWidth="xl">
        <StyledToolBar disableGutters>
          {downLg && (
            <ToggleWrapper onClick={handleDrawerToggle}>
              <LegendToggle />
            </ToggleWrapper>
          )}

          <CustomButton onClick={() => router.push("/")} startIcon={<Public />}>
            Към основния сайт
          </CustomButton>

          <Box flexGrow={1} />

          <FlexBox alignItems="center" gap={2}>
            <NotificationsPopover />
            <AccountPopover />
          </FlexBox>
        </StyledToolBar>
      </Container>
    </DashboardNavbarRoot>
  );
};
export default DashboardNavbar;
