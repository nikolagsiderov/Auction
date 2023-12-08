import { Clear } from "@mui/icons-material";
import {
  alpha,
  Box,
  IconButton,
  styled,
  TableCell,
  TableRow,
} from "@mui/material";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  fontSize: 14,
  paddingTop: 10,
  fontWeight: 600,
  paddingBottom: 10,
  color: theme.palette.text.dark,
  borderBottom: `1px solid ${theme.palette.text.disabled}`,
}));

const CategoryWrapper = styled(Box)(({ theme }) => ({
  fontSize: 13,
  padding: "3px 12px",
  borderRadius: "16px",
  display: "inline-block",
  color: theme.palette.text.dark,
  backgroundColor: theme.palette.text.disabled,
}));

const StyledTableRow = styled(TableRow)({
  ":last-child .MuiTableCell-root": {
    border: 0,
  },
  "&.Mui-selected": {
    backgroundColor: "transparent",
    ":hover": {
      backgroundColor: "transparent",
    },
  },
});

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.text.dark,
  "& .MuiSvgIcon-root": {
    fontSize: 19,
  },
  ":hover": {
    color: theme.palette.info.main,
  },
}));

const UploadImageBox = styled(Box)(({ theme }) => ({
  width: 70,
  height: 70,
  display: "flex",
  overflow: "hidden",
  borderRadius: "8px",
  position: "relative",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: alpha(theme.palette.info.main, 0.1),
}));

const StyledClear = styled(Clear)({
  top: 5,
  right: 5,
  fontSize: 15,
  cursor: "pointer",
  position: "absolute",
  color: "red",
  backgroundColor: "#fff",
  borderRadius: 20,
});

export {
  CategoryWrapper,
  StyledIconButton,
  StyledTableRow,
  StyledTableCell,
  UploadImageBox,
  StyledClear,
};
