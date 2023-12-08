import { useState } from "react";
import { useRouter } from "next/router";
import { Delete, Edit, RemoveRedEye } from "@mui/icons-material";
import { Box, Switch, Avatar } from "@mui/material";
import { FlexBox } from "components/flex-box";
import { Paragraph, Small } from "components/Typography";
import { currency } from "utils/lib";
import {
  StyledTableRow,
  StyledTableCell,
  StyledIconButton,
} from "../StyledComponents";

const ItemRow = ({ item }) => {
  const {
    id,
    title,
    startingPrice,
    buyNowPrice,
    reservedPrice,
    endDate,
    snipingProtection,
  } = item;

  const router = useRouter();
  const [itemSnipingProtection, setItemSnipingProtection] =
    useState(snipingProtection);

  return (
    <StyledTableRow tabIndex={-1} role="checkbox">
      <StyledTableCell align="left">
        <FlexBox alignItems="center" gap={1.5}>
          <Avatar
            src={
              "https://upload.wikimedia.org/wikipedia/commons/4/44/Cyrvul.jpg"
            }
            sx={{
              borderRadius: "8px",
            }}
          />
          <Box>
            <Paragraph>{title}</Paragraph>
            <Small color="text.dark">#{id}</Small>
          </Box>
        </FlexBox>
      </StyledTableCell>

      <StyledTableCell align="left">{currency(startingPrice)}</StyledTableCell>

      <StyledTableCell align="left">{currency(buyNowPrice)}</StyledTableCell>

      <StyledTableCell align="left">{currency(reservedPrice)}</StyledTableCell>

      <StyledTableCell align="left">{endDate}</StyledTableCell>

      <StyledTableCell align="left">
        <Switch
          color="info"
          checked={itemSnipingProtection}
          onChange={() => setItemSnipingProtection((state) => !state)}
          disabled
        />
      </StyledTableCell>

      <StyledTableCell align="center">
        <StyledIconButton onClick={() => router.push(`/vendor/items/${id}`)}>
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
export default ItemRow;
