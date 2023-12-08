import Link from "next/link";
import { Box, Container, Grid, Button, styled } from "@mui/material";
import { FlexBox } from "components/flex-box";
import { Paragraph } from "components/Typography";
import { Google, Facebook, Instagram } from "@mui/icons-material";

const StyledLink = styled("a")(({ theme }) => ({
  display: "block",
  borderRadius: 4,
  cursor: "pointer",
  position: "relative",
  padding: "0.3rem 0rem",
  color: theme.palette.white,
  "&:hover": {
    color: theme.palette.text.disabled,
  },
}));

const Footer = () => {
  return (
    <footer>
      <Box bgcolor="secondary.main">
        <Container
          sx={{
            p: "1rem",
            color: "white",
          }}
        >
          <Box py={10} overflow="hidden">
            <Grid container spacing={3}>
              <Grid item lg={4} md={6} sm={6} xs={12}>
                <Link href="/">
                  <a>
                    <img
                      mb={2.5}
                      height={88}
                      src="/assets/logo4x4light.png"
                      alt="logo"
                    />
                  </a>
                </Link>

                <Paragraph mb={2.5} color="text.disabled">
                  Създадена през 2023 година, Beeds Foundation дава възможност
                  на хората да набират средства за добри каузи изключително
                  бързо, лесно и прозрачно. Мисията ни е да помогнем за
                  изграждането на едно солидарно общество.
                </Paragraph>

                <Button
                  style={{
                    marginRight: 10,
                    borderRadius: 10,
                    backgroundColor: "#fff",
                  }}
                  onClick={() => push("/")}
                  variant="contained"
                >
                  <img src="/assets/appstore-transparent.png" width={"100px"} />
                </Button>
                <Button
                  style={{
                    marginLeft: 10,
                    borderRadius: 10,
                    backgroundColor: "#fff",
                  }}
                  onClick={() => push("/")}
                  variant="contained"
                >
                  <img
                    src="/assets/googleplay-transparent.png"
                    width={"100px"}
                  />
                </Button>
              </Grid>

              <Grid item lg={2} md={6} sm={6} xs={12}>
                <Box
                  fontSize="18px"
                  fontWeight="600"
                  mb={1.5}
                  lineHeight="1"
                  color="white"
                >
                  За нас
                </Box>

                <div>
                  {aboutLinks.map((item, ind) => (
                    <Link href="/" key={ind} passHref>
                      <StyledLink>{item}</StyledLink>
                    </Link>
                  ))}
                </div>
              </Grid>

              <Grid item lg={3} md={6} sm={6} xs={12}>
                <Box
                  fontSize="18px"
                  fontWeight="600"
                  mb={1.5}
                  lineHeight="1"
                  color="white"
                >
                  Помощ
                </Box>

                <div>
                  {helpLinks.map((item, ind) => (
                    <Link href="/" key={ind} passHref>
                      <StyledLink>{item}</StyledLink>
                    </Link>
                  ))}
                </div>
              </Grid>

              <Grid item lg={3} md={6} sm={6} xs={12}>
                <Box
                  fontSize="18px"
                  fontWeight="600"
                  mb={1.5}
                  lineHeight="1"
                  color="white"
                >
                  Контакти
                </Box>

                <Box py={0.6} color="white">
                  бул. „Арсеналски“ 51, 1421 ж.к. Лозенец, София, България
                </Box>

                <Box py={0.6} color="white">
                  Email: nikolagsiderov@gmail.com
                </Box>

                <Box py={0.6} mb={2} color="white">
                  Phone: +359 88 5826990
                </Box>

                <FlexBox className="flex" mx={-0.625}>
                  <a
                    href={"https://www.google.com/search?q=nashiyasait.com"}
                    target="_blank"
                    rel="noreferrer noopenner"
                  >
                    <Google color="white" />
                  </a>
                  <a
                    href={"https://www.facebook.com/nikolagsiderov"}
                    target="_blank"
                    rel="noreferrer noopenner"
                  >
                    <Facebook color="white" />
                  </a>
                  <a
                    href={"https://www.instagram.com/nikolagsiderov"}
                    target="_blank"
                    rel="noreferrer noopenner"
                  >
                    <Instagram color="white" />
                  </a>
                </FlexBox>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>
    </footer>
  );
};

const aboutLinks = [
  "Екип",
  "Нашата мисия",
  "Общи условия",
  "Политика за поверителност",
];

const helpLinks = ["Помощен център", "Наддаване и покупки"];

export default Footer;
