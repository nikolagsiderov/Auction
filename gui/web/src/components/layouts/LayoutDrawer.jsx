import { Box, Drawer, styled } from "@mui/material";

const Wrapper = styled(Box)(({ theme }) => ({
  height: "100%",
  width: "inherit",
  position: "fixed",
  overflow: "hidden",
  boxShadow: theme.shadows[1],
  zIndex: theme.zIndex.drawer + 3,
  color: theme.palette.white,
  backgroundColor: theme.palette.text.dark,
}));

const LayoutDrawer = (props) => {
  const { children, open, onClose, drawerWidth = 280 } = props;
  return (
    <Drawer
      open={open}
      anchor="left"
      onClose={onClose}
      PaperProps={{
        sx: {
          width: drawerWidth,
        },
      }}
    >
      <Wrapper>{children}</Wrapper>
    </Drawer>
  );
};
export default LayoutDrawer;
