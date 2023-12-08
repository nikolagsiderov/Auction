import { Box, Container, Grid } from "@mui/material";
import MobileAppBanner from "components/MobileAppBanner";

const MobileAppSection = () => {
  return (
    <Box pt={3}>
      <Container>
        <Grid container spacing={2}>
          <Grid item md={12} xs={12}>
            <MobileAppBanner
              key={1}
              mode="light"
              title={"Свали"}
              bgImage={"/assets/iphone-mockup2.png"}
              discount={"Безплатно"}
              headTitle={"Приложението"}
              description={"Сега достъпно на Google Play и Apple Store."}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};
export default MobileAppSection;
