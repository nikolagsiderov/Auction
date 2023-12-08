import { Close } from "@mui/icons-material";
import {
  Dialog,
  DialogContent,
  IconButton,
  Table,
  TableContainer,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@mui/material";
import { currency } from "utils/lib";

const ItemHistoryViewDialog = (props) => {
  const { history, openDialog, handleCloseDialog } = props;

  return (
    <Dialog open={openDialog} maxWidth={false} onClose={handleCloseDialog}>
      <DialogContent
        sx={{
          maxWidth: 900,
          width: "100%",
        }}
      >
        <TableContainer>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Потребител</TableCell>
                <TableCell>Сума</TableCell>
                <TableCell>Кога</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {history.map((obj, index) => (
                <TableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {obj.userEmailAddress}
                  </TableCell>
                  <TableCell>{currency(obj.bidAmount)}</TableCell>
                  <TableCell>
                    {new Date(obj.createdDate).toLocaleString("bg-BG")}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <IconButton
          sx={{
            position: "absolute",
            top: 3,
            right: 3,
          }}
          onClick={handleCloseDialog}
        >
          <Close fontSize="small" color="secondary" />
        </IconButton>
      </DialogContent>
    </Dialog>
  );
};
export default ItemHistoryViewDialog;
