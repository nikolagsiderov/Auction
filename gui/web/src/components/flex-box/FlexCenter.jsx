import { Box } from "@mui/material";

const FlexCenter = ({ children, ...props }) => (
  <Box height={"300px"} position={"relative"}>
    <Box position={"absolute"} top={"80%"} left={"44%"} {...props}>
      {children}
    </Box>
  </Box>
);

export default FlexCenter;
