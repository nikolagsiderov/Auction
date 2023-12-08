import { Fragment } from "react";
import { Box, Button, Divider } from "@mui/material";
import { FlexBox } from "components/flex-box";
import { Facebook, Google } from "@mui/icons-material";

const SocialButtons = (props) => {
  return (
    <Fragment>
      <Box mb={3} mt={3.8}>
        <Box width="200px" mx="auto">
          <Divider />
        </Box>

        <FlexBox justifyContent="center" mt={-1.625}>
          <Box color="text.dark" bgcolor="background.paper" px={2}>
            или
          </Box>
        </FlexBox>
      </Box>

      <FlexBox mb={1}>
        <Button
          className="facebookButton"
          size="medium"
          fullWidth
          sx={{
            height: 44,
          }}
          style={{
            textTransform: "none",
            backgroundColor: "#4267B2",
            color: "#fff",
          }}
        >
          <Facebook />
          <Box fontSize="12px" ml={1}>
            Влез с Facebook
          </Box>
        </Button>
      </FlexBox>

      <FlexBox mt={1}>
        <Button
          className="googleButton"
          size="medium"
          fullWidth
          sx={{
            height: 44,
          }}
          style={{
            textTransform: "none",
            backgroundColor: "#4285F4",
            color: "#fff",
          }}
        >
          <Google />
          <Box fontSize="12px" ml={1}>
            Влез с Google
          </Box>
        </Button>
      </FlexBox>
    </Fragment>
  );
};
export default SocialButtons;
