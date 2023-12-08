import { Search } from "@mui/icons-material";
import { InputBase, styled } from "@mui/material";

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  height: 44,
  fontSize: 14,
  width: "100%",
  maxWidth: 350,
  fontWeight: 500,
  padding: "0 1rem",
  borderRadius: "8px",
  color: theme.palette.text.dark,
  backgroundColor: theme.palette.background.paper,
  [theme.breakpoints.down("sm")]: {
    maxWidth: "100%",
  },
  "::placeholder": {
    color: theme.palette.text.disabled,
  },
}));

const SearchInput = (props) => {
  return (
    <StyledInputBase
      startAdornment={
        <Search
          sx={{
            fontSize: 19,
            mr: 1,
          }}
        />
      }
      {...props}
    />
  );
};
export default SearchInput;
