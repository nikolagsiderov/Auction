import Router from "next/router";
import {
  Box,
  Card,
  Stack,
  Table,
  TableContainer,
  TableBody,
  useMediaQuery,
  Button,
} from "@mui/material";
import TableHeader from "components/data-table/TableHeader";
import TablePagination from "components/data-table/TablePagination";
import VendorDashboardLayout from "components/layouts/vendor";
import { H3 } from "components/Typography";
import useMuiTable from "hooks/useMuiTable";
import Scrollbar from "components/Scrollbar";
import { ItemRow } from "pages-sections/vendor";
import api from "../../../../shared/api/items";
import { FlexBox } from "components/flex-box";
import SearchInput from "components/SearchInput";
import { Add } from "@mui/icons-material";

const SearchArea = (props) => {
  const { searchPlaceholder, buttonText, handleBtnClick } = props;
  const downSM = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  return (
    <FlexBox mb={2} gap={2} justifyContent="space-between" flexWrap="wrap">
      <SearchInput placeholder={searchPlaceholder} />

      <Button
        color="info"
        fullWidth={downSM}
        variant="contained"
        startIcon={<Add />}
        onClick={handleBtnClick}
        sx={{
          minHeight: 44,
        }}
      >
        {buttonText}
      </Button>
    </FlexBox>
  );
};

SearchArea.defaultProps = {
  buttonText: "Създай",
  searchPlaceholder: "Потърси...",
};

const tableHeading = [
  {
    id: "title",
    label: "Заглавие",
    align: "left",
  },
  {
    id: "startingPrice",
    label: "Начална цена",
    align: "left",
  },
  {
    id: "buyNowPrice",
    label: "Купи сега цена",
    align: "left",
  },
  {
    id: "reservedPrice",
    label: "Запазена цена",
    align: "left",
  },
  {
    id: "endDate",
    label: "Срок",
    align: "left",
  },
  {
    id: "snipingProtection",
    label: "Sniping protection",
    align: "left",
  },
  {
    id: "action",
  },
];

ItemsGrid.getLayout = function getLayout(page) {
  return <VendorDashboardLayout>{page}</VendorDashboardLayout>;
};

export default function ItemsGrid(props) {
  const { items } = props;

  const filteredItems = items.map((item) => ({
    id: item.id,
    title: item.title,
    startingPrice: item.startingPrice,
    buyNowPrice: item.buyNowPrice,
    reservedPrice: item.reservedPrice,
    endDate: item.endDate,
    snipingProtection: item.snipingProtection,
  }));
  const {
    order,
    orderBy,
    selected,
    rowsPerPage,
    filteredList,
    handleChangePage,
    handleRequestSort,
  } = useMuiTable({
    listData: filteredItems,
  });
  return (
    <Box py={4}>
      <H3 mb={2}>Моите аукциони</H3>

      <SearchArea
        handleSearch={() => {}}
        handleBtnClick={() => Router.push("/vendor/items/create")}
      />

      <Card>
        <Scrollbar autoHide={false}>
          <TableContainer
            sx={{
              minWidth: 900,
            }}
          >
            <Table>
              <TableHeader
                order={order}
                hideSelectBtn
                orderBy={orderBy}
                heading={tableHeading}
                rowCount={items.length}
                numSelected={selected.length}
                onRequestSort={handleRequestSort}
              />

              <TableBody>
                {filteredList.map((item, index) => (
                  <ItemRow item={item} key={index} />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <Stack alignItems="center" my={4}>
          <TablePagination
            onChange={handleChangePage}
            count={Math.ceil(items.length / rowsPerPage)}
          />
        </Stack>
      </Card>
    </Box>
  );
}

export const getServerSideProps = async () => {
  const items = await api.getItems();
  return {
    props: {
      items,
    },
  };
};
