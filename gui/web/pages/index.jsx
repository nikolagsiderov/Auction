import { Box } from "@mui/material";
import SEO from "components/SEO";
import MainCarousel from "pages-sections/index/MainCarousel";
import MobileAppSection from "pages-sections/index/MobileAppSection";
import ServiceSection from "pages-sections/index/ServiceSection";
import MainLayout from "components/layouts/MainLayout";

const Index = () => {
  return (
    <MainLayout>
      <SEO title="Beeds.bg: Първият в България благотворителен аукцион" />
      <Box bgcolor="#F6F6F6" style={{ paddingBottom: 30 }}>
        <MainCarousel />

        <ServiceSection />

        <MobileAppSection />
      </Box>
    </MainLayout>
  );
};

export default Index;
