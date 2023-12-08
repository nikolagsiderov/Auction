import { useRouter } from "next/router";
import { Delete, Edit, RemoveRedEye } from "@mui/icons-material";
import { Box } from "@mui/material";
import { FlexBox } from "components/flex-box";
import { Paragraph, Small } from "components/Typography";
import {
  StyledTableRow,
  StyledTableCell,
  StyledIconButton,
} from "../StyledComponents";

const CategoryRow = ({ category }) => {
  const { id, title, description } = category;

  const router = useRouter();

  return (
    <StyledTableRow tabIndex={-1} role="checkbox">
      <StyledTableCell align="left">
        <FlexBox alignItems="center" gap={1.5}>
          <Box>
            <Paragraph>{title}</Paragraph>
            <Small color="text.dark">#{id}</Small>
          </Box>
        </FlexBox>
      </StyledTableCell>

      <StyledTableCell align="left">{description}</StyledTableCell>

      <StyledTableCell align="center">
        <StyledIconButton
          onClick={() => router.push(`/admin/categories/${id}`)}
        >
          <Edit />
        </StyledIconButton>

        <StyledIconButton>
          <RemoveRedEye />
        </StyledIconButton>

        <StyledIconButton>
          <Delete />
        </StyledIconButton>
      </StyledTableCell>
    </StyledTableRow>
  );
};
export default CategoryRow;
