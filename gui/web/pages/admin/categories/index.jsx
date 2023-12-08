import Router from "next/router";
import {
  Box,
  Card,
  Table,
  TableContainer,
  TableBody,
  useMediaQuery,
  Button,
} from "@mui/material";
import TableHeader from "components/data-table/TableHeader";
import AdminDashboardLayout from "components/layouts/admin";
import { H3 } from "components/Typography";
import Scrollbar from "components/Scrollbar";
import { CategoryRow } from "pages-sections/admin";
import api from "../../../../shared/api/categories";
import { useState, useEffect } from "react";
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
    id: "description",
    label: "Описание",
    align: "left",
  },
  {
    id: "action",
  },
];

CategoriesGrid.getLayout = function getLayout(page) {
  return <AdminDashboardLayout>{page}</AdminDashboardLayout>;
};

export default function CategoriesGrid() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async () => await api.getCategories().then((data) => setCategories(data));
  }, []);

  // if (categories.length <= 0) {
  //   return (
  //     <FlexCenter>
  //       <CircularProgress />
  //     </FlexCenter>
  //   );
  // } else {
  return (
    <Box py={4}>
      <H3 mb={2}>Дарителски категории</H3>

      <SearchArea
        handleSearch={() => {}}
        handleBtnClick={() => Router.push("/admin/categories/create")}
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
                hideSelectBtn
                heading={tableHeading}
                rowCount={categories.length}
              />

              <TableBody>
                {categories.map((category, index) => (
                  <CategoryRow category={category} key={index} />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>
      </Card>
    </Box>
  );
}
// }
