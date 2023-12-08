import { Box, Grid } from "@mui/material";
import VendorDashboardLayout from "components/layouts/vendor";

VendorDashboard.getLayout = function getLayout(page) {
  return <VendorDashboardLayout>{page}</VendorDashboardLayout>;
};

export default function VendorDashboard() {
  return (
    <Box py={4}>
      <Grid container spacing={3}>
        {/* ALL TRACKING CARDS */}
        <Grid container item md={6} xs={12} spacing={3}>
          {/* {cardList.map((item) => (
            <Grid item md={6} sm={6} xs={12} key={item.id}></Grid>
          ))} */}
        </Grid>
      </Grid>
    </Box>
  );
}
