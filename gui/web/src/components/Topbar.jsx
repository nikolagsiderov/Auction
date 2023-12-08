import Link from "next/link";
import { useState } from "react";
import { Add, Facebook, Instagram, Remove } from "@mui/icons-material";
import { Box, Chip, Container, IconButton, styled } from "@mui/material";
import { Span } from "components/Typography";
import { FlexBetween, FlexBox } from "components/flex-box";
import { layoutConstant } from "utils/constants";

const TopbarWrapper = styled(Box, {
  shouldForwardProp: (props) => props !== "bgColor",
})(({ theme, expand }) => ({
  fontSize: 12,
  height: layoutConstant.topbarHeight,
  color: theme.palette.white,
  backgroundColor: theme.palette.secondary.main,
  transition: "height 300ms ease",
  "& .menuItem": {
    minWidth: 100,
  },
  "& .marginRight": {
    marginRight: "1.25rem",
  },
  "& .expand": {
    display: "none",
    padding: 0,
  },
  "& .handler": {
    height: layoutConstant.topbarHeight,
  },
  "& .menuTitle": {
    fontSize: 12,
    marginLeft: "0.5rem",
    fontWeight: 600,
  },
  [theme.breakpoints.down("sm")]: {
    height: expand ? 80 : layoutConstant.topbarHeight,
    "& .topbarRight": {
      display: expand ? "flex" : "none",
      paddingBottom: 5,
    },
    "& .expand": {
      display: "block",
      height: layoutConstant.topbarHeight,
    },
    "& .MuiSvgIcon-root": {
      color: "white",
    },
  },
}));

const StyledContainer = styled(Container)(({ theme }) => ({
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  [theme.breakpoints.down("sm")]: {
    alignItems: "start",
    flexDirection: "column",
  },
}));

const Topbar = () => {
  const [expand, setExpand] = useState(false);

  return (
    <TopbarWrapper expand={expand ? 1 : 0}>
      <StyledContainer>
        <FlexBetween width="100%">
          <FlexBox alignItems="center" gap={1}>
            <Chip
              label="Последвай ни"
              size="small"
              sx={{
                color: "white",
                fontWeight: 700,
                backgroundColor: "primary.main",
                "& .MuiChip-label": {
                  pl: ".8rem",
                  pr: ".8rem",
                },
              }}
            />
            <Span className="title">Последвай ни в социалните мрежи</Span>
          </FlexBox>

          <IconButton
            disableRipple
            className="expand"
            onClick={() => setExpand((state) => !state)}
          >
            {expand ? <Remove /> : <Add />}
          </IconButton>
        </FlexBetween>

        <FlexBox className="topbarRight" alignItems="center">
          <FlexBox alignItems="center" gap={1.5}>
            {socialLinks.map(({ id, Icon, url }) => (
              <Link href={url} key={id}>
                <a
                  style={{
                    lineHeight: 0,
                  }}
                >
                  <Icon
                    sx={{
                      fontSize: 16,
                    }}
                  />
                </a>
              </Link>
            ))}
          </FlexBox>
        </FlexBox>
      </StyledContainer>
    </TopbarWrapper>
  );
};

const socialLinks = [
  {
    id: 1,
    Icon: Facebook,
    url: "https://www.facebook.com/nikolagsiderov",
  },
  {
    id: 2,
    Icon: Instagram,
    url: "https://www.instagram.com/nikolagsiderov/",
  },
];

export default Topbar;
