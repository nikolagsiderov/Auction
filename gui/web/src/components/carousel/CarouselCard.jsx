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
  [theme.breakpoints.down("md")]: {
    padding: 24,
    textAlign: "center",
    backgroundImage: "none",
    justifyContent: "center",
  },
}));

const CarouselCard = ({
  title,
  bgImage,
  headTitle,
  discount,
  buttonLink,
  buttonText,
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
          <Span style={{ color: "primary.main" }}>{discount}</Span>
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
          style={{ borderRadius: 10, color: "secondary.main" }}
          variant="contained"
          size="large"
          onClick={() => push(buttonLink)}
        >
          {buttonText}
        </Button>
      </Box>
    </CardWrapper>
  );
};
export default CarouselCard;
