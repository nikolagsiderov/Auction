import { Container, Grid } from "@mui/material";
import ItemCard from "components/items/ItemCard";

const ItemsSection = ({ items }) => {
  return (
    <Container
      sx={{
        py: 8,
      }}
    >
      <Grid container spacing={3}>
        {items.map((item) => (
          <Grid key={item.id} item sm={3} xs={12}>
            <ItemCard item={item} key={item.id} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ItemsSection;
