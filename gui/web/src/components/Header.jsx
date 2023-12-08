import Link from "next/link";
import { Fragment, useState } from "react";
import {
  Box,
  Dialog,
  Drawer,
  styled,
  IconButton,
  useMediaQuery,
  Container,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Clear, PersonOutline, Add, Search, Person } from "@mui/icons-material";
import AccountPopover from "./popovers/AccountPopover";
import clsx from "clsx";
import { layoutConstant } from "utils/constants";
import Login from "pages-sections/sessions/Login";
import { Paragraph } from "components/Typography";
import MobileMenu from "components/navbar/MobileMenu";
import { FlexBetween, FlexBox } from "components/flex-box";
import Router from "next/router";
import { isAuthenticated } from "utils/authentication";
import { useSelector, useDispatch } from "react-redux";

export const HeaderWrapper = styled(Box)(({ theme }) => ({
  zIndex: 3,
  position: "relative",
  height: layoutConstant.headerHeight,
  transition: "height 250ms ease-in-out",
  background: theme.palette.background.paper,
  [theme.breakpoints.down("sm")]: {
    height: layoutConstant.mobileHeaderHeight,
  },
}));

const StyledContainer = styled(Container)({
  gap: 2,
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
});

const Header = ({ isFixed, className, searchInput }) => {
  const theme = useTheme();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [searchBarOpen, setSearchBarOpen] = useState(false);
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));
  const downMd = useMediaQuery(theme.breakpoints.down(1150));
  const toggleDialog = () => setDialogOpen(!dialogOpen);
  const toggleSearchBar = () => setSearchBarOpen(!searchBarOpen);
  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.accessToken.value);

  const DIALOG_DRAWER = (
    <Fragment>
      <Dialog
        scroll="body"
        open={dialogOpen}
        fullWidth={isMobile}
        onClose={toggleDialog}
        sx={{
          zIndex: 9999,
        }}
      >
        <Login toggleDialog={toggleDialog} />
      </Dialog>
    </Fragment>
  );

  // FOR SMALLER DEVICE
  if (downMd) {
    return (
      <HeaderWrapper className={clsx(className)}>
        <StyledContainer>
          <FlexBetween width="100%">
            {/* LEFT CONTENT - NAVIGATION ICON BUTTON */}
            <Box flex={1}>
              <MobileMenu />
            </Box>

            {/* MIDDLE CONTENT - LOGO */}
            <Link href="/">
              <img
                height={44}
                src="/assets/logo4x4lightcircle.png"
                alt="logo"
              />
            </Link>

            {/* RIGHT CONTENT - LOGIN, CART, SEARCH BUTTON */}
            <FlexBox justifyContent="end" flex={1}>
              <Box component={IconButton} onClick={toggleSearchBar}>
                <Search />
              </Box>

              <Box component={IconButton} onClick={toggleDialog}>
                <Person />
              </Box>

              <Box component={IconButton}>
                <Add />
              </Box>
            </FlexBox>
          </FlexBetween>

          {/* SEARCH FORM DRAWER */}
          <Drawer
            open={searchBarOpen}
            anchor="top"
            onClose={toggleSearchBar}
            sx={{
              zIndex: 9999,
            }}
          >
            <Box
              sx={{
                width: "auto",
                padding: 2,
                height: "100vh",
              }}
            >
              <FlexBetween mb={1}>
                <Paragraph>Потърси в Beeds</Paragraph>

                <IconButton onClick={toggleSearchBar}>
                  <Clear />
                </IconButton>
              </FlexBetween>

              {/* CATEGORY BASED SEARCH FORM */}
              {searchInput}
            </Box>
          </Drawer>

          {/* LOGIN FORM DIALOG AND CART SIDE BAR  */}
          {DIALOG_DRAWER}
        </StyledContainer>
      </HeaderWrapper>
    );
  }
  return (
    <HeaderWrapper className={clsx(className)}>
      <StyledContainer>
        {/* LEFT CONTENT - LOGO AND CATEGORY */}
        <FlexBox mr={2} minWidth="170px" alignItems="center">
          <Link href="/">
            <a>
              <img
                height={44}
                src="/assets/logo4x4lightcircle.png"
                alt="logo"
              />
            </a>
          </Link>
        </FlexBox>

        {/* SEARCH FORM */}
        <FlexBox justifyContent="center" flex="1 1 0">
          {searchInput}
        </FlexBox>

        <FlexBox gap={1.5} alignItems="center">
          {isAuthenticated(accessToken, dispatch) ? (
            <AccountPopover />
          ) : (
            <Box
              component={IconButton}
              p={1.25}
              bgcolor="text.disabled"
              onClick={toggleDialog}
            >
              <PersonOutline />
            </Box>
          )}

          <Box
            p={1.25}
            bgcolor="text.disabled"
            component={IconButton}
            onClick={() => Router.push("/vendor/items/create")}
          >
            <Add />
          </Box>
        </FlexBox>

        {/* LOGIN FORM DIALOG AND CART SIDE BAR  */}
        {DIALOG_DRAWER}
      </StyledContainer>
    </HeaderWrapper>
  );
};
export default Header;
