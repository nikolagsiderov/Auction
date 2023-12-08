import { Box, Container, MenuItem, styled } from "@mui/material";
import ArrowRight from "@mui/icons-material/ArrowRight";
import NavLink from "components/NavLink";
import { FlexBox } from "components/flex-box";
import CustomCard from "components/CustomCard";
import navbarNavigations from "./navbarNavigations";

const navLinkStyle = {
  cursor: "pointer",
  transition: "color 150ms ease-in-out",
  "&:hover": {
    color: "primary.main",
  },
  "&:last-child": {
    marginRight: 0,
  },
};

const StyledNavLink = styled(NavLink)({
  ...navLinkStyle,
  display: "flex",
  fontWeight: 500,
});

const ParentNav = styled(Box)(({ theme }) => ({
  "&:hover": {
    color: theme.palette.primary.main,
    "& > .parent-nav-item": {
      display: "block",
    },
  },
}));
const ParentNavItem = styled(Box)(({ theme }) => ({
  top: 0,
  zIndex: 5,
  left: "100%",
  paddingLeft: 8,
  display: "none",
  position: "absolute",
  [theme.breakpoints.down(1640)]: {
    right: "100%",
    left: "auto",
    paddingRight: 8,
  },
}));
const NavBarWrapper = styled(CustomCard)(({ theme, border }) => ({
  height: "60px",
  display: "block",
  borderRadius: "0px",
  position: "relative",
  ...(border && {
    borderBottom: `1px solid ${theme.palette.text.disabled}`,
  }),
  [theme.breakpoints.down(1150)]: {
    display: "none",
  },
}));
const InnerContainer = styled(Container)({
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
});
const ChildNavsWrapper = styled(Box)({
  zIndex: 5,
  left: "50%",
  top: "100%",
  display: "none",
  position: "absolute",
  transform: "translate(-50%, 0%)",
});

const Navbar = ({ elevation, border }) => {
  const renderNestedNav = (list = [], isRoot = false) => {
    return list.map((nav) => {
      if (isRoot) {
        if (nav.url) {
          return (
            <StyledNavLink href={nav.url} key={nav.title}>
              {nav.icon} <span>&nbsp;</span> {nav.title}
            </StyledNavLink>
          );
        }
        if (nav.child) {
          return (
            <FlexBox
              key={nav.title}
              alignItems="center"
              position="relative"
              fontWeight={500}
              flexDirection="column"
              sx={{
                "&:hover": {
                  "& > .child-nav-item": {
                    display: "block",
                  },
                },
              }}
            >
              <FlexBox alignItems="flex-end" gap={0.5} sx={navLinkStyle}>
                {nav.icon} {nav.title}
              </FlexBox>

              <ChildNavsWrapper className="child-nav-item">
                <CustomCard
                  elevation={3}
                  sx={{
                    mt: 2.5,
                    py: 1,
                    minWidth: 200,
                  }}
                >
                  {renderNestedNav(nav.child)}
                </CustomCard>
              </ChildNavsWrapper>
            </FlexBox>
          );
        }
      } else {
        if (nav.url) {
          return (
            <NavLink href={nav.url} key={nav.title}>
              <MenuItem>{nav.title}</MenuItem>
            </NavLink>
          );
        }
        if (nav.child) {
          return (
            <ParentNav position="relative" minWidth="230px" key={nav.title}>
              <MenuItem color="text.dark">
                <Box flex="1 1 0" component="span">
                  {nav.title}
                </Box>
                <ArrowRight fontSize="small" />
              </MenuItem>

              <ParentNavItem className="parent-nav-item">
                <CustomCard
                  sx={{
                    py: "0.5rem",
                    minWidth: "230px",
                  }}
                  elevation={3}
                >
                  {renderNestedNav(nav.child)}
                </CustomCard>
              </ParentNavItem>
            </ParentNav>
          );
        }
      }
    });
  };
  return (
    <NavBarWrapper hoverEffect={false} elevation={elevation} border={border}>
      <InnerContainer>
        <FlexBox gap={4}>{renderNestedNav(navbarNavigations, true)}</FlexBox>
      </InnerContainer>
    </NavBarWrapper>
  );
};

//  set default props data
Navbar.defaultProps = {
  elevation: 2,
};

export default Navbar;
