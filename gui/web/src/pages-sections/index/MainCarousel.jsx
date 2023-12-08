import { Box, Container, Grid, Stack } from "@mui/material";
import Carousel from "components/carousel/Carousel";
import CarouselCard from "components/carousel/CarouselCard";

const MainCarousel = () => {
  // custom css
  const carouselStyles = {
    overflow: "hidden",
    "& .carousel__dot-group": {
      mt: 0,
      left: 0,
      right: 0,
      bottom: 10,
      position: "absolute",
      "& div": {
        borderColor: "secondary.main",
        "::after": {
          backgroundColor: "secondary.light",
        },
      },
    },
  };
  return (
    <Box bgcolor="white" pt={3}>
      <Container>
        <Grid container spacing={2}>
          <Grid item md={12} xs={12}>
            <Carousel
              spacing="0px"
              infinite={true}
              showDots={true}
              autoPlay={false}
              visibleSlides={1}
              showArrow={false}
              sx={carouselStyles}
              totalSlides={2}
            >
              <CarouselCard
                key={1}
                mode="light"
                title={"Набирайте лесно и забавно"}
                bgImage={"/assets/banner.png"}
                discount={"За добри каузи"}
                headTitle={"Дарения"}
                buttonLink={"items"}
                buttonText={"Разгледай"}
                description={
                  "Първият, в България, онлайн благотворителен аукцион"
                }
              />
              <CarouselCard
                key={2}
                mode="light"
                title={"Подпомагай развитието"}
                bgImage={"/assets/banner2.png"}
                discount={"Удобно и лесно от вкъщи"}
                headTitle={"В провинцията"}
                buttonLink={"items"}
                buttonText={"Разгледай"}
                description={"Най-мощният инструмент за набиране на средства"}
              />
            </Carousel>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};
export default MainCarousel;
