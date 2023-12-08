import { useRouter } from "next/router";
import { Avatar, Box, useMediaQuery } from "@mui/material";
import LayoutDrawer from "../LayoutDrawer";
import Scrollbar from "components/Scrollbar";
import { FlexBetween } from "components/flex-box";
import { navigations } from "./NavigationList";
import SidebarAccordion from "../SidebarAccordion";
import {
  ListLabel,
  BadgeValue,
  StyledText,
  BulletIcon,
  NavWrapper,
  ExternalLink,
  NavItemButton,
  SidebarWrapper,
  ListIconWrapper,
} from "../LayoutStyledComponents";

const TOP_HEADER_AREA = 70;

const DashboardSidebar = (props) => {
  const { showMobileSideBar, setShowMobileSideBar } = props;
  const router = useRouter();
  const downLg = useMediaQuery((theme) => theme.breakpoints.down("lg"));

  // handle active current page
  const activeRoute = (path) => (router.pathname === path ? 1 : 0);

  // handle navigate to another route and close sidebar drawer in mobile device
  const handleNavigation = (path) => {
    router.push(path);
    setShowMobileSideBar();
  };
  const renderLevels = (data) => {
    return data.map((item, index) => {
      if (item.type === "label")
        return <ListLabel key={index}>{item.label}</ListLabel>;
      if (item.children) {
        return (
          <SidebarAccordion key={index} item={item}>
            {renderLevels(item.children)}
          </SidebarAccordion>
        );
      } else if (item.type === "extLink") {
        return (
          <ExternalLink
            key={index}
            href={item.path}
            rel="noopener noreferrer"
            target="_blank"
          >
            <NavItemButton key={item.name} name="child" active={0}>
              {item.icon ? (
                <ListIconWrapper>
                  <item.icon />
                </ListIconWrapper>
              ) : (
                <span className="item-icon icon-text">{item.iconText}</span>
              )}

              <StyledText>{item.name}</StyledText>

              {/* <Box mx="auto" /> */}

              {item.badge && <BadgeValue>{item.badge.value}</BadgeValue>}
            </NavItemButton>
          </ExternalLink>
        );
      } else {
        return (
          <Box key={index}>
            <NavItemButton
              key={item.name}
              className="navItem"
              active={activeRoute(item.path)}
              onClick={() => handleNavigation(item.path)}
            >
              {item?.icon ? (
                <ListIconWrapper>
                  <item.icon />
                </ListIconWrapper>
              ) : (
                <BulletIcon active={activeRoute(item.path)} />
              )}

              <StyledText>{item.name}</StyledText>

              {/* <Box mx="auto" /> */}

              {item.badge && <BadgeValue>{item.badge.value}</BadgeValue>}
            </NavItemButton>
          </Box>
        );
      }
    });
  };
  const content = (
    <Scrollbar
      autoHide
      clickOnTrack={false}
      sx={{
        overflowX: "hidden",
        maxHeight: `calc(100vh - ${TOP_HEADER_AREA}px)`,
      }}
    >
      <NavWrapper>{renderLevels(navigations)}</NavWrapper>
    </Scrollbar>
  );
  if (downLg) {
    return (
      <LayoutDrawer
        open={showMobileSideBar ? true : false}
        onClose={setShowMobileSideBar}
      >
        <Box p={2} maxHeight={TOP_HEADER_AREA}>
          <img
            alt="Logo"
            width={105}
            height={50}
            src="/assets/logo4x4lightcircle.png"
            style={{
              marginLeft: 8,
            }}
          />
        </Box>

        {content}
      </LayoutDrawer>
    );
  }
  return (
    <SidebarWrapper>
      <FlexBetween
        p={2}
        maxHeight={TOP_HEADER_AREA}
        justifyContent={"space-between"}
      >
        <Avatar
          src={"/assets/logo4x4lightcircle.png"}
          sx={{
            borderRadius: 0,
            width: "auto",
            marginLeft: 1,
          }}
        />
      </FlexBetween>

      {content}
    </SidebarWrapper>
  );
};
export default DashboardSidebar;
