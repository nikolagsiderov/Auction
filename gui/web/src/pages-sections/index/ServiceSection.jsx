import { Box, Container, styled } from "@mui/material";
import { H4, Span } from "components/Typography";
import { FlexRowCenter } from "components/flex-box";
import SecurityIcon from "@mui/icons-material/Security";
import BoltIcon from "@mui/icons-material/Bolt";
import CampaignIcon from "@mui/icons-material/Campaign";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";

const StyledFlexBox = styled(Box)(({ theme }) => ({
  display: "grid",
  padding: "2rem 0",
  gridTemplateColumns: "repeat(4, 1fr)",
  backgroundColor: theme.palette.white,
  [theme.breakpoints.down("md")]: {
    gap: 30,
    gridTemplateColumns: "repeat(2, 1fr)",
  },
  [theme.breakpoints.down("sm")]: {
    gap: 30,
    paddingLeft: "2rem",
    paddingRight: "2rem",
    gridTemplateColumns: "1fr",
  },
}));

const ServiceItem = styled(FlexRowCenter)(({ theme }) => ({
  ":last-child": {
    paddingRight: "20px",
  },
  paddingLeft: "20px",
  [theme.breakpoints.down("md")]: {
    ":nth-of-type(even)": {
      borderRight: 0,
    },
  },
  [theme.breakpoints.down("sm")]: {
    borderRight: 0,
    justifyContent: "flex-start",
  },
}));

const ServiceSection = () => {
  return (
    <Container
      sx={{
        mt: "2rem",
      }}
    >
      <StyledFlexBox style={{ borderRadius: 20 }}>
        <ServiceItem flexGrow={2} gap={5} key={1}>
          <SecurityIcon fontSize={"large"} />
          <Box>
            <H4 lineHeight={1.3}>Доверие</H4>
            <Span color="text.dark">
              Хората се доверяват на нас, защото гарантираме пълна прозрачност.
            </Span>
          </Box>
        </ServiceItem>
        <ServiceItem flexGrow={2} gap={5} key={2}>
          <BoltIcon fontSize={"large"} />
          <Box>
            <H4 lineHeight={1.3}>Ефективност</H4>
            <Span color="text.dark">
              Набирате дарения по-ефективно от всяка друга дарителска платформа.
            </Span>
          </Box>
        </ServiceItem>
        <ServiceItem flexGrow={2} gap={5} key={3}>
          <CampaignIcon fontSize={"large"} />
          <Box>
            <H4 lineHeight={1.3}>Популяризиране</H4>
            <Span color="text.dark">
              Екипът ни ще популяризира вашата история в сайтове и социални
              мрежи.
            </Span>
          </Box>
        </ServiceItem>
        <ServiceItem flexGrow={2} gap={5} key={4}>
          <RocketLaunchIcon fontSize={"large"} />
          <Box>
            <H4 lineHeight={1.3}>Бързина</H4>
            <Span color="text.dark">
              Стартирате вашата добра кауза само с няколко клика. Бързо и лесно.
            </Span>
          </Box>
        </ServiceItem>
      </StyledFlexBox>
    </Container>
  );
};

export default ServiceSection;
