import { useRouter } from "next/router";
import { Box, styled, Button } from "@mui/material";
import { H1, H4, Paragraph, Span } from "components/Typography";

const CardWrapper = styled(Box)(({ theme, img }) => ({
  minHeight: 500,
  display: "flex",
  alignItems: "center",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  backgroundImage: `url(${img})`,
  backgroundColor: theme.palette.secondary.main,
  color: theme.palette.secondary.main,
  ...(theme.direction === "rtl" && {
    textAlign: "right",
    paddingRight: "5rem",
    justifyContent: "flex-end",
    "& > .MuiBox-root": {
      padding: 0,
    },
  }),
  [theme.breakpoints.down("md")]: {
    padding: 24,
    textAlign: "center",
    backgroundImage: "none",
    justifyContent: "center",
  },
}));

const MobileAppBanner = ({
  title,
  bgImage,
  headTitle,
  discount,
  description,
}) => {
  const { push } = useRouter();
  return (
    <CardWrapper img={bgImage} style={{ borderRadius: 20 }}>
      <Box
        pl={{
          md: 10,
        }}
      >
        <H4
          mb={1}
          lineHeight={1}
          fontWeight={400}
          textTransform="uppercase"
          fontSize={{
            sm: 30,
            xs: 24,
          }}
        >
          {title}
        </H4>

        <H1
          fontSize={{
            sm: 60,
            xs: 44,
          }}
          lineHeight={1}
          textTransform="uppercase"
        >
          {headTitle}
        </H1>

        <H4
          fontSize={{
            sm: 30,
            xs: 24,
          }}
          lineHeight={1}
          mt={1.5}
          textTransform="uppercase"
        >
          <Span color="primary.main">{discount}</Span>
        </H4>

        <Paragraph
          fontSize={{
            sm: 18,
            xs: 14,
          }}
          mb={4}
        >
          {description}
        </Paragraph>

        <Button
          style={{
            padding: 10,
            marginRight: 10,
            borderRadius: 10,
            backgroundColor: "#fff",
          }}
          variant="contained"
          onClick={() => push("/")}
        >
          <img src="/assets/appstore-transparent.png" width={"150px"} />
        </Button>
        <Button
          style={{
            padding: 10,
            marginLeft: 10,
            borderRadius: 10,
            backgroundColor: "#fff",
          }}
          variant="contained"
          onClick={() => push("/")}
        >
          <img src="/assets/googleplay-transparent.png" width={"150px"} />
        </Button>
      </Box>
    </CardWrapper>
  );
};
export default MobileAppBanner;
