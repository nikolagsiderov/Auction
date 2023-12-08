import { Box } from "@mui/material";
import SEO from "components/SEO";
import ItemsSection from "pages-sections/index/ItemsSection";
import MainLayout from "components/layouts/MainLayout";
import api from "../../../shared/api/items";

const Items = (props) => {
  return (
    <MainLayout>
      <SEO title="Beeds: Аукциони" />
      <Box bgcolor="#F6F6F6">
        <ItemsSection items={props.items} />
      </Box>
    </MainLayout>
  );
};

export const getServerSideProps = async () => {
  const items = await api.getItems();

  return {
    props: {
      items,
    },
  };
};

export default Items;
