import { Box } from "@mui/material";

const ItemDescription = (props) => {
  const item = props.item;

  return (
    <Box>
      <Box>{item.description}</Box>
    </Box>
  );
};
export default ItemDescription;
