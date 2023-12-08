import {
  Checkbox,
  styled,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
} from "@mui/material";
import SwapVertIcon from "@mui/icons-material/SwapVert";

// styled components
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  fontWeight: 600,
  padding: "16px 20px",
  color: theme.palette.text.dark,
}));

const TableHeader = (props) => {
  const {
    order,
    heading,
    orderBy,
    rowCount,
    numSelected,
    onRequestSort,
    onSelectAllClick = () => {},
    hideSelectBtn = false,
  } = props;
  return (
    <TableHead
      sx={{
        backgroundColor: "text.disabled",
      }}
    >
      <TableRow>
        {!hideSelectBtn && (
          <StyledTableCell align="left">
            <Checkbox
              color="info"
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={(event) =>
                onSelectAllClick(event.target.checked, "item")
              }
            />
          </StyledTableCell>
        )}

        {heading.map((headCell) => (
          <StyledTableCell
            key={headCell.id}
            align={headCell.align}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              onClick={() => onRequestSort(headCell.id)}
              direction={orderBy === headCell.id ? order : "asc"}
              sx={{
                "& .MuiTableSortLabel-icon": {
                  opacity: 1,
                },
              }}
              IconComponent={() => <SwapVertIcon />}
            >
              {headCell.label}
            </TableSortLabel>
          </StyledTableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};
export default TableHeader;
