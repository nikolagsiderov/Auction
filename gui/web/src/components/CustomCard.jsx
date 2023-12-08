import { Card, styled } from "@mui/material";

const CustomCard = styled(({ hoverEffect, children, ...rest }) => (
  <Card {...rest}>{children}</Card>
))(({ theme, hoverEffect }) => ({
  overflow: "unset",
  borderRadius: "8px",
  transition: "all 250ms ease-in-out",
  "&:hover": {
    ...(hoverEffect && {
      boxShadow: theme.shadows[3],
    }),
  },
}));
CustomCard.defaultProps = {
  hoverEffect: false,
};
export default CustomCard;
